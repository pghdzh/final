import * as THREE from 'three'
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';

let renderer, camera, scene, light, controls;

let animationFrame;

/**
 * 窗口变动
 */
function onWindowResize() {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    renders();
}

/**
 * @description 渲染
 */
function renders() {
    renderer.render(scene, camera);
    scene.rotation.y += 0.0005;
}

/**
 * 更新
 **/
function animate() {
    animationFrame = window.requestAnimationFrame(() => {
        if (controls) controls.update();
        renders();
        animate();
    });
}

export function init() {
    let Dom = document.querySelector('#home-banner');
    let width = Dom.clientWidth, height = Dom.clientHeight;

    // 初始化场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020924);
    scene.fog = new THREE.Fog(0x020924, 200, 1000);
    window.scene = scene;
    // 初始化相机
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    // 对应x,y,z轴坐标，按需调整
    camera.position.set(100, 0, 400);
    // 相机录像的方位
    camera.lookAt(scene.position);
    window.camera = camera;
    // 初始化渲染器
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    // 渲染容器
    const containerDom = document.querySelector('#home-banner');
    containerDom.appendChild(renderer.domElement);

    // 添加星空中的点
    const positions = [];
    const colors = [];
    const geometry = new THREE.BufferGeometry();
    for (var i = 0; i < 10000; i++) {
        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * 2 - 1;
        vertex.y = Math.random() * 2 - 1;
        vertex.z = Math.random() * 2 - 1;
        positions.push(vertex.x, vertex.y, vertex.z);
        // 随机生成颜色
        var color = new THREE.Color();
        color.setHSL(Math.random() * 0.2 + 0.5, 0.55, Math.random() * 0.25 + 0.55);
        colors.push(color.r, color.g, color.b);
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    const texture = new THREE.TextureLoader().load(require('@/assets/logo.png'));
    var starsMaterial = new THREE.ParticleBasicMaterial({
        map: texture,
        size: 2,
        transparent: true,
        opacity: 1,
        vertexColors: true, 
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });
    let stars = new THREE.ParticleSystem(geometry, starsMaterial);
    stars.scale.set(300, 300, 300);
    scene.add(stars);

    // 添加事件控制
    controls = new OrbitControls(camera, renderer.domElement);
    // 滑动惯性，关闭之后滑动停止画面会立即停止，不会像吃了德芙一样丝滑
    controls.enableDamping = true;
    // 缩放
    controls.enableZoom = true;
    // 自动旋转(也可以通过render中调整场景的rotation轴实现)
    controls.autoRotate = false;
    controls.autoRotateSpeed = 1;
    // 鼠标右键拖拽
    controls.enablePan = false;

    animate();
    window.addEventListener('resize', onWindowResize, false);
}

export function clearAll() {
    controls = null;
    light = null;
    renderer.clear();
    scene.clear();
    camera.clear();
    window.cancelAnimationFrame(animationFrame);
}
