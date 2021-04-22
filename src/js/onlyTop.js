/**
 * 
 * three.jsの記述 
 * 
 * */
 window.addEventListener('load', init);
 function init(){
 
     //サイズを指定
     const width = window.innerWidth;
     const height = window.innerHeight;
 
     //レンダリング処理
     const renderer = new THREE.WebGLRenderer({
         canvas: document.querySelector('#service-canvas'),
         alpha: true,//背景を透明にする
     });
     renderer.setPixelRatio(window.devicePixelRatio);
     renderer.setSize(width, height);
 
     //シーンを作成
     const scene = new THREE.Scene();
 
     //カメラを作成
     const camera = new THREE.PerspectiveCamera(45, width/height, 1, 10000);//(画角, アスペクト比, 描画開始距離, 描画終了距離)
     camera.position.set(1000, 0, 500);//カメラのセット位置（x, y, z）
     camera.lookAt(new THREE.Vector3(0, 0, 0));
 
     //コンテナーを作成
     const container = new THREE.Object3D();
     scene.add(container);
    //画像読み込みを定義
    const loader = new THREE.TextureLoader();
     //マテリアルを作成
     const material = [
         new THREE.MeshStandardMaterial({ map: loader.load('../dist/images/texture-1.jpg'), side:THREE.DoubleSide }),
         new THREE.MeshStandardMaterial({ map: loader.load('../dist/images/texture-2.jpg'), side:THREE.DoubleSide }),
         new THREE.MeshStandardMaterial({ map: loader.load('../dist/images/texture-3.jpg'), side:THREE.DoubleSide }),
         new THREE.MeshStandardMaterial({ map: loader.load('../dist/images/texture-4.jpg'), side:THREE.DoubleSide }),
         new THREE.MeshStandardMaterial({ map: loader.load('../dist/images/texture-1.jpg'), side:THREE.DoubleSide }),
         new THREE.MeshStandardMaterial({ map: loader.load('../dist/images/texture-2.jpg'), side:THREE.DoubleSide }),
     ];
     //BOXの形状を作成
     const geometry = new THREE.BoxGeometry(150, 150, 150);//球体
     //メッシュを作成
     const box = new THREE.Mesh(geometry, material);
     //シーンに追加
     scene.add(box);
 
     //平行光源
     const directionalLight = new THREE.DirectionalLight(0xffffff);
     directionalLight.position.set(1, 1, 1);
     scene.add(directionalLight);
     const light = new THREE.AmbientLight(0xffffff, 1.0);
     scene.add(light);

     
     const degree = 150;
     let boxPosition = box.position;
     //x方向の速度
     let vx = Math.random();
    
     //y方向の速度
     let vy = Math.random();
     
     //z方向の速度
     let vz = Math.random();
     //初回実行
     tick();
     //マイフレームごとに実行されるループイベント
     function tick(){
        box.rotation.y += 0.01;
        box.rotation.x += 0.01;
        boxPosition.x += vx;
        boxPosition.y += vy;
        boxPosition.z += vz;
        // console.log(boxPosition);
        if(boxPosition.x > degree || boxPosition.x < -degree){
            vx *= -1;
        }
        if(boxPosition.y > degree || boxPosition.y < -degree){
            vy *= -1;
        }
        if(boxPosition.z > degree || boxPosition.z < -degree){
            vz *= -1;
        }
        requestAnimationFrame(tick);

         //レンダリング
         renderer.render(scene, camera);//レンダリング（更新処理）
     }
 }