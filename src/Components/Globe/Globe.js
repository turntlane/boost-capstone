import React, { Component } from 'react'
import * as THREE from 'three'

class Globe extends Component {
  constructor(props) {
    super(props)

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
  }
  

  componentDidMount(texture) {
    const loader = new THREE.TextureLoader();
    loader.load(
        // resource URL
        'textures/land_ocean_ice_cloud_2048.jpg',
    
        // onLoad callback
        function ( texture ) {
            // in this example we create the material when the texture is loaded
            const material = new THREE.MeshBasicMaterial( {
                map: texture
             } );
        },
    
        // onProgress callback currently not supported
        undefined,
    
        // onError callback
        function ( err ) {
            console.error( 'An error happened.' );
        }
    );
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      30,
      width / height,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    const geometry   = new THREE.SphereGeometry(0.5, 32, 32)
    const material  = new THREE.MeshPhongMaterial( {
        map: texture
     } );
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    camera.position.z = 3
    renderer.setClearColor(0,0)
    renderer.setSize(width, height)

    const light = new THREE.DirectionalLight({
        color: "white",
        intensity: 0,
      });
      light.position.set(20, 50, 20);
  
      const ambientLight = new THREE.AmbientLight("lightblue", 0);
  
      scene.add(light, ambientLight);

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material
    this.cube = cube

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
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default Globe