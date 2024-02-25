import { Loading, Message, MessageBox } from 'element-ui';
import { Toast, VantLoading } from 'vant';
import { GET_TOKEN, REDIRECT_ROUTER } from '@/utils/auth';
const errorCode = {
  4001: '身份过期，正在重新验证',
  default: '系统未知错误，请反馈给管理员',
};
const Agents = [
  "Android",
  "iPhone",
  "SymbianOS",
  "Windows Phone",
  "iPad",
  "iPod",
];
const isPhone = Agents.filter((i) => navigator.userAgent.includes(i))
//请求接口loding
let loadingShowFlag = true;
let loading;
//并发接口统一刷新
let concurrencyShowFlag = true;
//是否隐藏loading
let noloading = false
function startLoading() {
  // console.log('@', isPhone.length, navigator.userAgent)
  if (isPhone.length) {
    loading = Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
  } else {
    loading = Loading.service({
      lock: true,
      text: '加载中……',
      background: 'rgba(0, 0, 0, 0.3)',
    });
  }

}

function endLoading() {
  if (isPhone.length) {
    loading.close();
  } else {
    loading.close()
  }
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
function logAgainFn() {
  REDIRECT_ROUTER()
}
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 600000, // 请求超时时间
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
    };
    info.url = config.url;
    info.data = config.data;
    info.headers = config.headers;
    console.log('[', config.url, '：请求信息]', info);
    // 是否需要设置 token
    // const isToken = (config.headers || {}).isToken === false;
    // if (GET_TOKEN() && !isToken) {
    //   config.headers['Authtoken'] = GET_TOKEN(); // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    if (info?.data?.noloading) {
      noloading = true
    }
    if (noloading) {
      tryHideFullScreenLoading();
    }
    if (concurrencyShowFlag && !noloading) {
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
  async (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || res.code || 200;
    console.log('[', res.config.url, '：返回信息]', res.data)
    // 获取错误信息
    const msg = res.data.msg || errorCode[code] || errorCode['default'];
    // 如果是忽略的错误码，直接返回 msg 异常
    if (code === 500) {
      if (isPhone.length) {
        Toast.fail(msg);
      } else {
        Message({
          message: msg,
          type: 'error',
        });
      }
      if (concurrencyShowFlag) {
        tryHideFullScreenLoading();
      }
      return res.data;
      // return Promise.reject(new Error(msg));
    }
    else if (code === 4001) {
      logAgainFn()
    }
    else if (code === 4005) {
      if (isPhone.length) {
        Toast.fail(msg);
      } else {
        Message({
          message: msg,
          type: 'error',
        });
      }
      if (concurrencyShowFlag) {
        tryHideFullScreenLoading();
      }
      return res.data;
    }
    else if (code === 4006) {
      if (isPhone.length) {
        Toast.fail(msg);
      } else {
        Message({
          message: msg,
          type: 'error',
        });
      }
      if (concurrencyShowFlag) {
        tryHideFullScreenLoading();
      }
      return res.data;
    }
    else {
      if (concurrencyShowFlag) {
        tryHideFullScreenLoading();
      }
      return res.data;
    }
  },
  (error) => {
    console.log('err:' + error);
    let { message } = error;
    if (message === 'Network Error') {
      message = '后端接口连接异常';
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时';
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常';
    }
    if (isPhone.length) {
      Toast({
        message: message,
        type: 'fail',
        duration: 5 * 1000
      });

    } else {
      Message({
        message: message,
        type: 'error',
        duration: 5 * 1000,
      });
    }

    // 对响应错误做点什么
    tryHideFullScreenLoading();
    return Promise.reject(new Error(error));
  }
);
//并发
const concurrencyRequest = (urls, maxNum = 2) => {
  //并发开启
  // console.log('并发开启')
  startLoading();
  concurrencyShowFlag = false;
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
          concurrencyShowFlag = true;
          endLoading();
          resolve(results);
        }
        //解除递归
        request();
      }
    }
    //调用
    request();
  });
};
export { http, concurrencyRequest };
