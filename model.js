import * as THREE from 'three';
import {GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const canvas =document.querySelector(".model");
const scene=new THREE.Scene();
scene.background=new THREE.Color(0x000000);
const sizes={
    width:window.innerWidth/2,
    height:window.innerHeight
}



var myModel;

const geometry = new THREE.CircleGeometry( 2.5,123 );
const material = new THREE.MeshStandardMaterial( {
    color: 0x555555, 
    side: THREE.DoubleSide,
} );
geometry.rotateX(-Math.PI/2);
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );
/* const geometry=new THREE.BoxGeometry(1,1,1);
const material=new THREE.MeshBasicMaterial({color:"red"});
const mesh=new THREE.Mesh(geometry,material);
scene.add(mesh); */


const light=new THREE.DirectionalLight(0xffffff,1);
light.position.set(0,-1,0);
scene.add(light);
const light2=new THREE.DirectionalLight(0xffffff,1);
light.position.set(0,1,0);
scene.add(light2);
const light3=new THREE.DirectionalLight(0xffffff,1);
light.position.set(3,2,1);
scene.add(light3);
const light4=new THREE.DirectionalLight(0xffffff,1);
light.position.set(1,2,0);
scene.add(light4);
const ambientlight=new THREE.AmbientLight(0x404040,100);
scene.add(ambientlight);
const ambientlight2=new THREE.AmbientLight(0x404040,100);
scene.add(ambientlight2);
const ambientlight3=new THREE.AmbientLight(0x404040,100);
ambientlight3.position.set(-2,0,0)
scene.add(ambientlight3);
const PointLight= new THREE.PointLight(0xc4c4c4,10);
light.position.set(500,300,0);
scene.add(PointLight);
const PointLight2= new THREE.PointLight(0xc4c4c4,10);
light.position.set(0,-300,500);
scene.add(PointLight2);
const PointLight3= new THREE.PointLight(0xc4c4c4,10);
light.position.set(-500,300,0);
scene.add(PointLight3);
const spotLight = new THREE.SpotLight( 0xffffff ,3,100,0.2,0.5);
spotLight.position.set( 0, 25, 0 );
spotLight.castShadow=true;
scene.add( spotLight );
const hemislight= new THREE.HemisphereLight(0xffffff,0x000000,50);
scene.add(hemislight);



const Camera= new THREE.PerspectiveCamera(40,sizes.width/sizes.height,0.1,120);
Camera.position.set(3,-3,10);
Camera.lookAt(0,2,5)
scene.add(Camera);
const loader=new GLTFLoader();
loader.load("assets/porsche.glb",function(glb){
    myModel=glb.scene;
    myModel.scale.set(1,1,1);
    scene.add(glb.scene);
    
},
function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

},
// called when loading has errors
function ( error ) {

    console.log( 'An error happened' );

}

)
const renderer=new THREE.WebGLRenderer({
    canvas:canvas
})
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const controls = new OrbitControls( Camera, renderer.domElement );
controls.enableDamping=true;
controls.enablePan=true;
controls.minDistance=5;
controls.maxDistance=8.5;
controls.minPolarAngle=0.5;
controls.maxPolarAngle=1.5;
controls.autoRotate-false;
controls.target=new THREE.Vector3(0,1,0);
controls.update();

renderer.setSize(sizes.width,sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.shadowMap.enabled=true;
renderer.gammaOutput=true;



function animate(){

    requestAnimationFrame(animate);
    myModel.rotation.y+=0.001;
    controls.update();
    renderer.render(scene,Camera);
    
}
animate();
