import axios from "axios";
import store from '@/store'
import { Loading, Message, MessageBox } from "element-ui";
import errorCode from '@/utils/errorCode'
import { refreshToken } from '@/api/login'
// 需要忽略的提示。忽略后，自动 Promise.reject('error')
const ignoreMsgs = [
  '无效的刷新令牌', // 刷新令牌被删除时，不用提示
  '刷新令牌已过期' // 使用刷新令牌，刷新获取新的访问令牌时，结果因为过期失败，此时需要忽略。否则，会导致继续 401，无法跳转到登出界面
]
// 令牌是否正在刷新中
let isRefreshToken = false
// 令牌请求队列
let requestList = []
// 是否显示重新登录
export const isRelogin = { show: false }
//请求接口loding
let loadingShowFlag = true;
let loading;
//并发接口统一刷新
let concurrencyShowFlag = true
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: "加载中……",
    background: "rgba(0, 0, 0, 0.3)",
  });
}

function endLoading() {
  loading.close();
}

let needLoadingRequestCount = 0;

function showFullScreenLoading() {
  if (!loadingShowFlag) {
    return;
  }
  if (needLoadingRequestCount == 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

function tryHideFullScreenLoading() {
  if (!loadingShowFlag || needLoadingRequestCount <= 0) {
    loadingShowFlag = true;
    return;
  }
  needLoadingRequestCount--;
  if (needLoadingRequestCount == 0) {
    endLoading();
  }
}
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 15000, // 请求超时时间
  // 禁用 Cookie 等信息
  // withCredentials: false,
});
// http.defaults.timeout = 30000;
// Add a request interceptor
http.interceptors.request.use(
  (config) => {
    let info = {
      url: null,
      data: null,
      headers: null,
    }
    info.url = config.url
    info.data = config.data
    info.headers = config.headers
    // console.log('[', config.url, '：请求信息]', info)
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    if (getAccessToken() && !isToken) {
      config.headers['Authorization'] = 'Bearer ' + getAccessToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    //设置对应抬头
    // 设置租户
    const tenantId = getTenantId()
    // console.log('tenantId', tenantId)
    if (tenantId) {
      config.headers['tenant-id'] = tenantId
    }
    // 设置党组织
    const partyOrgId = getPartyOrgId()
    // console.log('partyOrgId', partyOrgId)

    const roleId = getRoleId()
    // console.log('roleId', roleId)

    if (partyOrgId) {
      config.headers['partyorg-id'] = partyOrgId
    }
    if (roleId) {
      config.headers['role-id'] = roleId
    }
    if (concurrencyShowFlag) {
      showFullScreenLoading();
    }
    return config;
  },
  (error) => {
    // Do something with request error
    tryHideFullScreenLoading();
    return Promise.reject(error);
  }
);

// Add a response interceptor
http.interceptors.response.use(

  async res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200
    // console.log('dddddd', code, res)
    // 获取错误信息
    const msg = res.data.msg || errorCode[code] || errorCode['default']
    // 如果是忽略的错误码，直接返回 msg 异常
    if (ignoreMsgs.indexOf(msg) !== -1) {
      if (concurrencyShowFlag) {
        tryHideFullScreenLoading();
      }
      return Promise.reject(msg)
    } else if (code === 401) {
      if (!isRefreshToken) {
        isRefreshToken = true
        // 1. 如果获取不到刷新令牌，则只能执行登出操作
        if (!getRefreshToken()) {
          return handleAuthorized()
        }
        // 2. 进行刷新访问令牌
        try {
          const refreshTokenRes = await refreshToken()
          // 2.1 刷新成功，则回放队列的请求 + 当前请求
          setToken(refreshTokenRes.data)
          requestList.forEach(cb => cb())
          return http(res.config)
        } catch (e) { // 为什么需要 catch 异常呢？刷新失败时，请求因为 Promise.reject 触发异常。
          // 2.2 刷新失败，只回放队列的请求
          requestList.forEach(cb => cb())
          // 提示是否要登出。即不回放当前请求！不然会形成递归
          return handleAuthorized()
        } finally {
          requestList = []
          isRefreshToken = false
        }
      } else {
        // 添加到队列，等待刷新获取到新的令牌
        return new Promise(resolve => {
          requestList.push(() => {
            res.config.headers['Authorization'] = 'Bearer ' + getAccessToken()
            resolve(http(res.config))
          })
        })
      }
    } else if (code === 500) {
      Message({
        message: msg,
        type: 'error'
      })
      if (concurrencyShowFlag) {
        tryHideFullScreenLoading();
      }
      return Promise.reject(new Error(msg))
    } else if (code !== 200) {
      Message({
        message: msg,
        type: 'error'
      })
      if (concurrencyShowFlag) {
        tryHideFullScreenLoading();
      }
      return Promise.reject(new Error(msg))
    } else {
      if (concurrencyShowFlag) {
        tryHideFullScreenLoading();
      }
      return res.data
    }


  },
  error => {
    console.log('err' + error)
    let { message } = error
    if (message === 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    // 对响应错误做点什么
    tryHideFullScreenLoading();
    return Promise.reject(error);
  }
);
//并发
const concurrencyRequest = (urls, maxNum = 2) => {
  //并发开启
  // console.log('并发开启')
  startLoading();
  concurrencyShowFlag = false
  return new Promise((resolve) => {
    if (urls.length === 0) {
      resolve([]);
      return;
    }
    const results = [];
    let index = 0; // 下一个请求的下标
    let count = 0; // 当前请求完成的数量
    // 发送递归请求
    async function request() {
      if (index === urls.length) return;
      const i = index; // 保存序号，使result和urls相对应
      const url = urls[index];
      index++;
      console.log(url);
      try {
        const resp = await http(url);
        // resp 加入到results
        results[i] = resp;
      } catch (err) {
        // err 加入到results
        results[i] = err;
      } finally {
        count++;
        // 判断是否所有的请求都已完成
        if (count === urls.length) {
          //并发结束
          // console.log('并发结束')
          concurrencyShowFlag = true
          endLoading();
          resolve(results);
        }
        //解除递归
        request();
      }
    }
    //调用
    request();
  })
}
//登出界面
function handleAuthorized() {
  if (!isRelogin.show) {
    isRelogin.show = true
    MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning'
    }
    ).then(() => {
      isRelogin.show = false
      if (getTenantId()) {
        store.dispatch('qjszPage/LOGIN_OUT').then(() => {
          location.href = getPath('/')
        })
      } else {
        location.reload()
      }
    }).catch(() => {
      isRelogin.show = false
    })
  }
  return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
}
export { http, concurrencyRequest };
// export function myAxios(options) {
//     return http;
// }