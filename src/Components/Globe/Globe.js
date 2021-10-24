import React, { Component } from 'react'
import * as THREE from 'three'
import image from '../../images/earthspec1k.jpeg'
import point from './Points'

class Globe extends Component {
  constructor(props) {
    super(props)

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
  }
  

  componentDidMount() {

    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      30,
      width / height,
      0.1,
      1000
    )
    const loader = new THREE.TextureLoader();
    const textureLoader = loader.load(
        'https://www.uni-konstanz.de/typo3temp/secure_downloads/56557/0/8b23dff0ec21c12d67252fe5eeaef84c5e84f89d/csm_Fotolia_71874838_XL_a44ba62b41.jpg'
    );

    


    const renderer = new THREE.WebGLRenderer({ alpha: true })
    const geometry   = new THREE.SphereGeometry(0.5, 32, 32)
    const material  = new THREE.MeshStandardMaterial({map: textureLoader, color: 'white'});
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    camera.position.z = 3
    renderer.setClearColor(0,0)
    renderer.setSize(width, height)

    const light = new THREE.DirectionalLight({
        color: "red",
        intensity: 10,
      });
      light.position.set(-10, -4, 5);
  
      const ambientLight = new THREE.AmbientLight("red", 0);
  
      scene.add(light, ambientLight);

      
      

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material
    this.sphere = sphere

    this.mount.appendChild(this.renderer.domElement)
    this.start()
  }

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId)
  }

  animate() {
    this.sphere.rotation.x += -0.0002
    this.sphere.rotation.y +=-0.002

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div
        style={{ width: '1000px', height: '1000px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default Globe