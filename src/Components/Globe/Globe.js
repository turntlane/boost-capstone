import React, { Component } from "react";
import "./Globe.css";
import * as THREE from "three";
import image from "../../images/earthspec1k.jpeg";
import image2 from "../../images/earthbump1k.jpeg";
import image3 from "../../images/moonmap1k.jpeg";
import point from "./Points";

class Globe extends Component {
  constructor(props) {
    super(props);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 10000);
    //  scene.background = new THREE.Color('transparent')
    const loader = new THREE.TextureLoader();
    const textureLoader = loader.load(image);

    const loader2 = new THREE.TextureLoader();
    const textureLoader2 = loader2.load(image3);

    const vertices = [];

    for (let i = 0; i < 5000; i++) {
      const x = THREE.MathUtils.randFloatSpread(900);
      const y = THREE.MathUtils.randFloatSpread(400);
      const z = THREE.MathUtils.randFloatSpread(3000);

      vertices.push(x, y, z);
    }

    const dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    const dotMaterial = new THREE.PointsMaterial({ color: "white" });

    const points = new THREE.Points(dotGeometry, dotMaterial);

    scene.add(points);

    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      map: textureLoader,
      wireframe: true,
      color: 'white'
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const moonGeometry = new THREE.SphereGeometry(0.05, 10, 10);
    const moonMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader2,
      wireframe: true,
      color: 'white'
    });
    moonGeometry.bumpScale = 10;
    // moonMaterial.specular  = new THREE.Color('white')
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.x = 0.7;
    moon.position.y = 0.05;
    moon.position.z = 0;
    scene.add(moon);

    camera.position.x = -0.8;
    camera.position.y = 0.2;
    camera.position.z = 3;
    camera.rotation.x = 0.033;
    camera.rotation.y = 0.04;
    renderer.setClearColor(0, 0);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(
      camera.position.x + 30,
      camera.position.y + -20,
      camera.position.z + 40
    );
    directionalLight.name = "directional";
    // scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight("white", 0.2);

    scene.add(directionalLight, ambientLight);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.sphere = sphere;

    this.moonMaterial = moonMaterial;
    this.moon = moon;

    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  animate() {
    const axis = new THREE.Vector3(0, 1, 0).normalize();
    var quaternion = new THREE.Quaternion();
    this.moon.rotation.y += -0.01;
    this.moon.rotation.x += -0.001;
    this.sphere.rotation.y += 0.002;
    this.sphere.rotation.x += 0.0002;

    quaternion.setFromAxisAngle(axis, 0.008);
    this.moon.position.applyQuaternion(quaternion);

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div className="globe-container">
        <div
          className="globe"
          style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
          ref={(mount) => {
            this.mount = mount;
          }}
        />
      </div>
    );
  }
}

export default Globe;
