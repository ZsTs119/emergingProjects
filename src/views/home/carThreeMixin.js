import * as THREE from "three";
// 导入你实际使用的扩展库
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
export default {
  data() {
    return {
      scene: null,
      SpotLight: null,
      camera: null,
      renderer: null,
      controls: null,
      sphereMesh: null,
      carGroup: null,
      planeGeometry: null,
      canvasWidth: null,
      canvasHeight: null,
      gui: null,
      guiObj: {
        //车模型是否旋转
        carRotationYBool: false,
        //车模型五轨道是否播放动画
        carAnimationALLBool: false,
        //车模型单个轨道是否播放动画
        carAnimationBool: false
      },
      CarObject: {
        isLoading: true,
        //当前汽车模型
        mesh: null,
        // 用于动画的混合器
        carMixer: null,
        //存放不同模型动画混合器
        carAnimations: null,
        //存放不同模型独立的动画剪辑
        carDoorAnimations: null,
        //存放5个轨道动画的精灵标签
        carSpriteObject: {},
        //环境贴图路径
        cubeTextureUrl: "../threeCar/汽车贴图9/",
        //环境贴图6个面
        cubeTextureloadArray: [
          'nx.png',
          'px.png',
          'ny.png',
          'py.png',
          'pz.png',
          'nz.png'
        ],
        //球体贴图路径
        SphereTextureLoader: "../threeCar/panorama7.jpg",
        //模型路径
        gLTFLoaderUrl: "../threeCar/轿车.glb"
      }
    }
  },
  methods: {
    //初始方法
    async initData() {
      this.canvasWidth = window.innerWidth
      this.canvasHeight = window.innerHeight
      this.scene = new THREE.Scene();
      this.SpotLight = new THREE.SpotLight(0xffffff, 10);
      this.camera = new THREE.PerspectiveCamera(50, this.canvasWidth / this.canvasHeight, 10, 5000);
      this.renderer = new THREE.WebGLRenderer();
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.sphereMesh = this.getSphereMesh();
      this.carGroup = await this.getCarMesh();
      this.planeGeometry = this.getPlaneGeometry();
      this.setLight();
      this.setScene();
      this.setCamera();
      this.setRenderer();
      this.setControls();
      this.setWindowEvent();
    },
    //灯光方法
    setLight() {
      //设置聚光灯对象
      this.SpotLight.position.set(0, 320, 0);
      this.SpotLight.angle = 1;
      this.SpotLight.penumbra = 1;
      this.SpotLight.power = 100,
        this.SpotLight.decay = 2;
      this.SpotLight.distance = 670;
      this.SpotLight.castShadow = true;
      this.SpotLight.shadow.mapSize.width = 1024;
      this.SpotLight.shadow.mapSize.height = 1024;
      this.SpotLight.shadow.camera.near = 10;
      this.SpotLight.shadow.camera.far = 100;
      this.SpotLight.shadow.focus = 1;
    },
    //场景添加方法
    setScene() {
      //向场景添加模型
      this.scene.add(this.sphereMesh, this.planeGeometry, this.carGroup, this.SpotLight);
    },
    //相机方法
    setCamera() {
      //设置相机的位置
      this.camera.position.set(
        1.067,
        24.488,
        -716.064);
      //设置相机的焦点为mesh场景
      this.camera.lookAt(0, 0, 0);
    },
    //渲染器方法
    setRenderer() {
      //渲染器背景颜色
      // renderer.setClearColor(0x444444);
      //设置渲染器的大小
      this.renderer.setSize(this.canvasWidth, this.canvasHeight);
      //渲染器的锯齿属性
      this.renderer.antialias = true;
      // console.log('devicePixelRatio', window.devicePixelRatio)
      //渲染器设置当前电脑像素比避免模糊
      this.renderer.setPixelRatio(window.devicePixelRatio);
      //渲染器输出颜色格式
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      //开启渲染器的阴影映射
      this.renderer.shadowMap.enabled = true;
      // 标准的阴影质量，也可以尝试其他类型以优化效果
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      //色调映射
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1;
      //将渲染器的渲染结果画布，添加到body中
      this.$refs['three-car'].appendChild(this.renderer.domElement);
    },
    //控制器方法
    setControls() {
      //禁止缩放,平移，最大最小垂直旋转角度
      this.controls.enableZoom = false
      this.controls.enablePan = false
      this.controls.maxPolarAngle = Math.PI / 2
      this.controls.minPolarAngle = Math.PI / 2 - 10
      //如果OrbitControls改变了相机参数,重新调用渲染器渲染三维场景
      this.controls.addEventListener("change", () => {
        // console.log('camera', camera.position)
        // console.log('controls', controls.target)
      })
    },
    // 回调函数更新动画
    render() {
      if (this.guiObj.carRotationYBool) {
        this.carGroup.rotation.y += 0.004;
      }
      if (this.guiObj.carAnimationALLBool) {
        //这里给动画设置更新速度，因为默认是一秒钟渲染60次，所以这里设置为1/60的值，
        this.CarObject.carMixer.update(0.004)
      }
      if (this.guiObj.carAnimationBool) {
        //这里给动画设置更新速度，因为默认是一秒钟渲染60次，所以这里设置为1/60的值，
        this.CarObject.carAnimations.forEach(mixer => mixer.update(0.012));
      }
      this.renderer.render(this.scene, this.camera);
      TWEEN.update()
      requestAnimationFrame(this.render);
    },
    //颜色选择器点击事件
    setCarColorEventClick() {
      const colorPicker = this.$refs.colorPicker
      // console.log('选择器', colorPicker)
      colorPicker.addEventListener('input', (event) => {
        // console.log('选择的颜色', event.target.value)
        let shellArray = [
          '外壳00', '外壳01', '外壳02', '外壳03', '外壳04', '外壳05', '外壳06'
        ]
        this.carGroup.children[0].traverse((child) => {
          if (shellArray.includes(child.name)) {
            child.material.color.set(event.target.value)
          }
        })

      }, false);
    },
    //车门视角点击事件
    setCameraCarDoorViewClick(value) {
      const cameraAct = new TWEEN.Tween(this.camera.position)
        .to({
          x: this.CarObject.carSpriteObject[value].x,
          y: this.CarObject.carSpriteObject[value].y,
          z: this.CarObject.carSpriteObject[value].z
        }, 2000)
        .easing(TWEEN.Easing.Quadratic.Out);
      // 相机移动时，焦点始终为模型的位置
      cameraAct.onUpdate(() => {
        this.camera.lookAt(0, 0, 0)
      })
      cameraAct.start()
    },
    //车内车外视角点击事件
    setCameraViewClick() {
      const insideCar = this.$refs.insideCar
      const outsideCar = this.$refs.outsideCar
      insideCar.addEventListener('click', (event) => {
        // console.log('我是insideCar')
        this.controls.target.set(-2, -50, -1.659)
        const cameraAct = new TWEEN.Tween(this.camera.position)
          .to({
            x: -43.250,
            y: -40.930,
            z: -0.487
          }, 2000)
          .easing(TWEEN.Easing.Quadratic.Out);
        // 相机移动时，焦点始终为模型的位置
        cameraAct.onUpdate(() => {
          this.camera.lookAt(-2, -50, -1.659)
        })
        cameraAct.start()
      }, false)
      outsideCar.addEventListener('click', (event) => {
        // console.log('我是outsideCar')
        this.controls.target.set(0, 0, 0)
        const cameraAct = new TWEEN.Tween(this.camera.position)
          .to({
            x: 711.813,
            y: 81.640,
            z: -2.589
          }, 2000)
          .easing(TWEEN.Easing.Quadratic.Out);
        // 相机移动时，焦点始终为模型的位置
        cameraAct.onUpdate(() => {
          this.camera.lookAt(0, 0, 0)
        })
        cameraAct.start()
      }, false)
    },
    //总动画点击事件
    playAllAnimationClick() {
      const outsideCar = this.$refs.allAniCar
      outsideCar.addEventListener('click', (event) => {
        this.CarObject.carMixer.setTime(0)
        this.guiObj.carAnimationALLBool = true
        this.CarObject.carMixer.addEventListener('loop', (e) => {
          this.guiObj.carAnimationALLBool = false
          // console.log('展开动画执行完毕')
        });
      })
    },
    //开始播放每个门的动画的逻辑
    playDoorAnimation(doorName) {
      // 先停止所有动画
      // console.log('CarObject.carAnimations', CarObject.carAnimations)
      this.CarObject.carAnimations.forEach(mixer => mixer.stopAllAction()
        .addEventListener('loop', (e) => {
          this.guiObj.carAnimationBool = false
          // console.log('动画执行完毕')
        }));
      // 播放指定门的动画
      const doorAnim = this.CarObject.carDoorAnimations[doorName];
      if (doorAnim && doorAnim.action) {
        this.guiObj.carAnimationBool = true
        doorAnim.action.reset().play();
      }
    },
    //window事件
    setWindowEvent() {
      //这里待添加逻辑生产环境隐藏gui
      // document.querySelector('.lil-gui').style.display = 'none';
      //设置onresize事件,在窗口被调整大小时,重新设置渲染器和相机的大小
      window.onresize = () => {
        //获取窗口的宽高
        const width = window.innerWidth;
        const height = window.innerHeight;
        //设置渲染器的大小
        this.renderer.setSize(width, height);
        //设置相机的宽高比
        this.camera.aspect = width / height;
        //更新相机的投影矩阵
        this.camera.updateProjectionMatrix();
      };
      //颜色选择器点击事件
      this.setCarColorEventClick()
      //车内车外视角点击事件
      this.setCameraViewClick()
      //总动画点击事件
      this.playAllAnimationClick()
      //调用回调函数更新动画
      this.render();
      //调用点击函数
      window.addEventListener('mousedown', this.setCarEventClick, false);
    },
    //设置汽车点击事件
    async setCarEventClick(event) {
      event.preventDefault();
      let mesh = this.CarObject.mesh
      // console.log('mesh', mesh, mesh.children[0].children)
      // 射线检测以找出被点击的部件
      let mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

      let raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, this.camera);

      let intersects = raycaster.intersectObjects(mesh.children[0].children, true);

      if (intersects.length > 0) {
        let object = intersects[0].object;
        // console.log('点击的模型', object)
        //精灵Sprite格式如：左前门:外壳04
        let objectName = object.name.split(':')[0];
        let objectValue = object.name.split(':')[1];
        //点击精灵模型过渡转换相机视角
        if (this.CarObject.carSpriteObject.hasOwnProperty(objectValue)) {
          // console.log('触发模型了', object.name, objectName, objectValue)
          //车门播放时间
          this.playDoorAnimation(objectName)
          //TWEEN移动事件
          this.setCameraCarDoorViewClick(objectValue)
        }
      }
    },
    //返回球体模型场景
    getSphereMesh() {
      //创建球体几何对象
      const sphereGeometry = new THREE.SphereGeometry(2000);
      //创建一个纹理加载对象
      const textureLoader = new THREE.TextureLoader();
      //加载当前目录的上级access文件下的图片，并返回一个纹理对象Texture
      const texture = textureLoader.load(this.CarObject.SphereTextureLoader);
      //设置色差
      texture.colorSpace = THREE.SRGBColorSpace
      //创建球体材质
      const sphereMaterial = new THREE.MeshBasicMaterial({
        // map: texture,
        color: "#000000",
        side: THREE.DoubleSide,
      })
      //创建球体网格模型
      const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
      return sphereMesh
    },
    //返回矩形平面
    getPlaneGeometry() {
      //创建一个组
      const geometryGroup = new THREE.Group();

      //创建聚光灯矩形平面
      const geometryTop = new THREE.PlaneGeometry(550, 200);
      const materialTop = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
      })
      const geometryMeshTop = new THREE.Mesh(geometryTop, materialTop);
      geometryMeshTop.rotateX(-Math.PI / 2)
      geometryMeshTop.receiveShadow = true;
      geometryMeshTop.position.y = 200

      //创建地板平面
      // 加载木板纹理
      const textureLoader = new THREE.TextureLoader();
      const woodTexture = textureLoader.load('../threeCar/floorMap.webp');
      const roughnessMap = textureLoader.load('../threeCar/floorMapTitle.jpg');
      const floorMaterial = new THREE.MeshLambertMaterial({
        color: 0x808080,
        map: woodTexture,
        roughnessMap: roughnessMap,
        //设置粗糙度
        roughness: 0,
        //设置金属度
        metalness: 0,
        //反射率
        reflectivity: 0,
        // 加强表面高光效果，模拟清漆层
        clearcoat: 1
      });
      const floorGeometry = new THREE.PlaneGeometry(1000, 600);
      const floorPlane = new THREE.Mesh(floorGeometry, floorMaterial);
      floorPlane.rotation.x = -Math.PI / 2;
      floorPlane.position.y = -185
      floorPlane.receiveShadow = true;

      //添加组
      geometryGroup.add(floorPlane, geometryMeshTop)

      return geometryGroup
    },
    //设置汽车材质
    setCarMaterials(gltf, cubeTextureLoader) {
      //基础材质
      const baseMaterialConfig = {
        // envMap: cubeTextureLoader,
        metalness: 1,
        roughness: 0.35,
      };
      //玻璃材质及除（外壳，高光金属以外的mesh）
      const glassMaterial = new THREE.MeshPhysicalMaterial({
        //设置立方体环境贴图
        // envMap: cubeTextureLoader,
        //设置环境贴图对mesh表面的影响
        // envMapIntensity: 1.0,
        //设置金属度
        metalness: 0,
        //设置粗糙度
        roughness: 0,
        //设置透光率
        transmission: 1,
        //设置折射率
        ior: 1.5
      });
      //外壳材质
      const shellMaterial = new THREE.MeshPhysicalMaterial({
        color: gltf.scene.getObjectByName('外壳01').material.color,
        // envMap: cubeTextureLoader,
        // envMapIntensity: 2.0,
        metalness: 0.9,
        roughness: 0.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
      })
      //高光金属材质
      const highlightMetalMaterial = new THREE.MeshPhysicalMaterial({
        //设置立方体环境贴图
        // envMap: cubeTextureLoader,
        //设置环境贴图对mesh表面的影响
        // envMapIntensity: 1.0,
        //设置金属度
        metalness: 1,
        //设置粗糙度
        roughness: 0,
        //设置透光率
        transmission: 0,
        //设置折射率
        ior: 1.5
      });
      //玻璃材质的模型
      let glassArray = [
        '玻璃00', '玻璃01', '玻璃02', '玻璃03', '玻璃04', '玻璃05',
        '玻璃06', '玻璃07', '天窗黑玻璃', '前灯罩02', '尾灯灯罩',
        '橡胶圈', '橡胶圈01', '白塑料', '羊毛毡内饰01', 'IPAD', '后视镜00', '后视镜01'
      ]
      //外壳材质的模型 
      let shellArray = [
        '外壳00', '外壳01', '外壳02', '外壳03', '外壳04', '外壳05', '外壳06'
      ]
      //高光金属材质的模型
      let highlightMetalArray = [
        '高光金属01', '高光金属03', '高光金属07', '高光金属08', '高光金属09',
        '高光金属10', '高光金属11', '高光金属12', '高光金属13', '高光金属14'
      ]
      //精灵Sprite
      let spriteObject = {
        '外壳04': {
          name: '左前门:',
          position: new THREE.Vector3(-224, 220, 336),
          mesh: null,
          x: 294,
          y: 57,
          z: -650
        },
        '外壳03': {
          name: '左后门:',
          position: new THREE.Vector3(-124, 227, 340),
          mesh: null,
          x: -470,
          y: 86,
          z: -533
        },
        '外壳02': {
          name: '右前门:',
          position: new THREE.Vector3(-224, 220, 155),
          mesh: null,
          x: 406,
          y: 23,
          z: 589
        },
        '外壳05': {
          name: '右后门:',
          position: new THREE.Vector3(-124, 227, 155),
          mesh: null,
          x: -363,
          y: 149,
          z: 599
        },
        '外壳06': {
          name: '后备箱:',
          position: new THREE.Vector3(160, 0, 100),
          mesh: null,
          x: -708,
          y: 105,
          z: -0.24
        }
      }
      //遍历模型批量修改材质
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          //遍历精灵Sprite数组
          for (const key in spriteObject) {
            if (child.name == key) {
              // console.log('key', key)
              let Sprite = this.setCarSprite(spriteObject[key].name + child.name)
              Sprite.position.copy(spriteObject[key].position)
              spriteObject[key].mesh = Sprite
              child.add(Sprite)
            }
          }
          // 设置汽车模型为产生阴影
          child.castShadow = true;
          child.receiveShadow = true;
          // 给所有的 mesh 设置一个基础材质
          // child.material.envMap = baseMaterialConfig.envMap;
          child.material.metalness = baseMaterialConfig.metalness;
          child.material.roughness = baseMaterialConfig.roughness;
          // 根据 mesh 名称，进一步为特定的 mesh 分配指定的材质
          if (glassArray.includes(child.name)) {
            child.material = glassMaterial;
          }
          else if (shellArray.includes(child.name)) {
            child.material = shellMaterial;
          }
          else if (highlightMetalArray.includes(child.name)) {
            child.material = highlightMetalMaterial;
          }
        }
      })
      //存储精灵模型
      this.CarObject.carSpriteObject = spriteObject
      //设置精灵SpriteTWEEN动画
      this.setCarSpriteTween()
    },
    //设置汽车动画
    setCarAnimation(gltf) {
      //存储每个门的动画轨迹
      this.CarObject.carAnimations = []
      //存储了加载得到的动画剪辑数组
      const loadedClips = gltf.animations
      //创建主混合器
      const mixer = new THREE.AnimationMixer(gltf.scene);
      // 创建独立的动画剪辑并为每个门设置动画
      this.CarObject.carDoorAnimations = {};
      loadedClips.forEach((clip) => {
        // clip.name === "All Animations" 时，会处理所有轨迹
        clip.tracks.forEach((track) => {
          const trackName = track.name.split('.')[0]; // 如 "左前门.quaternion"
          const doorName = trackName.split(' ')[0]; // 如 "左前门"
          // 创建一个包含单个轨迹的新动画剪辑
          const singleTrackClip = new THREE.AnimationClip(doorName, clip.duration, [track]);
          // 为这个动画剪辑创建一个混合器，并开始播放动画
          const doorMixer = new THREE.AnimationMixer(gltf.scene.getObjectByName(doorName));
          const doorAction = doorMixer.clipAction(singleTrackClip);
          // 存储动作以备后用
          this.CarObject.carDoorAnimations[doorName] = {
            clip: singleTrackClip,
            action: doorAction
          };
          // 把门的混合器记录到一个数组里以便更新
          this.CarObject.carAnimations.push(doorMixer);
        });
      });
      // console.log('CarObject', CarObject)

      //创建动画剪辑存放五个轨道动画
      const action = mixer.clipAction(gltf.animations[0]);
      // THREE.LoopOnce - 只执行一次
      // THREE.LoopRepeat - 重复次数为repetitions的值, 且每次循环结束时候将回到起始动作开始下一次循环。
      // THREE.LoopPingPong - 重复次数为repetitions的值, 且像乒乓球一样在起始点与结束点之间来回循环。
      action.setLoop(THREE.LoopRepeat);
      action.play();
      return mixer;
    },
    //设置汽车gui菜单
    setCarFolder(gltf) {
      //设置汽车模型默认值
      gltf.scene.position.y = -185
      gltf.scene.rotation.y = 3.15
    },
    //设置精灵Sprite
    setCarSprite(carName) {
      let texture = new THREE.TextureLoader().load('../threeCar/sprite.gif');
      let spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        color: 0xffffff,
        // 启用透明度
        transparent: true,
        visible: false
      });
      let sprite = new THREE.Sprite(spriteMaterial)
      sprite.renderOrder = 1
      sprite.scale.set(50, 50, 1);
      sprite.name = carName
      return sprite
    },
    //设置精灵SpriteTWEEN动画
    setCarSpriteTween() {
      let leftFrontGate = this.CarObject.carSpriteObject['外壳04'].mesh;
      let leftPostern = this.CarObject.carSpriteObject['外壳03'].mesh;
      let rightFrontGate = this.CarObject.carSpriteObject['外壳02'].mesh;
      let rightPostern = this.CarObject.carSpriteObject['外壳05'].mesh;
      let bottomPostern = this.CarObject.carSpriteObject['外壳06'].mesh;
      const spriteTween = new TWEEN.Tween({
        scale: 50
      }).to({
        scale: 70
      }, 1500).easing(TWEEN.Easing.Quadratic.Out);
      spriteTween.onUpdate(function (that) {
        leftFrontGate.scale.set(that.scale, that.scale, 1);
        leftPostern.scale.set(that.scale, that.scale, 1);
        rightFrontGate.scale.set(that.scale, that.scale, 1);
        rightPostern.scale.set(that.scale, that.scale, 1);
        bottomPostern.scale.set(that.scale * 3, that.scale * 3, 1);
      });
      spriteTween.yoyo(true);
      spriteTween.repeat(Infinity);
      spriteTween.start();
    },
    //返回汽车模型
    async getCarMesh() {
      //创建防抖
      let carSetTimeOut = null
      //创建GLTF加载器
      const loader = new GLTFLoader();
      //创建一个组
      const carGroup = new THREE.Group();
      //创建立方体贴图加载器
      const cubeTextureLoader = new THREE.CubeTextureLoader()
        .setPath(this.CarObject.cubeTextureUrl)
        .load(this.CarObject.cubeTextureloadArray);
      //加载金属的glb模型
      await loader.load(this.CarObject.gLTFLoaderUrl, (gltf) => {
        // console.log('gltf', gltf)
        //设置汽车材质
        this.setCarMaterials(gltf, cubeTextureLoader)
        //设置汽车gui菜单
        this.setCarFolder(gltf)
        //返回主模型动画控制五个轨道动画
        this.CarObject.carMixer = this.setCarAnimation(gltf)
        //将gltf里的scene添加到组里
        this.carGroup.add(gltf.scene);
      },

        // 进度回调函数
        (xhr) => {
          clearTimeout(carSetTimeOut)
          carSetTimeOut = setTimeout(() => {
            console.log(xhr, '加载完成');
            this.CarObject.isLoading = false
          }, 1000);
        },
        // 错误回调函数
        (error) => {
          console.error('An error happened', error);
        }
      )
      this.CarObject.mesh = carGroup
      return carGroup
    }
  }
}