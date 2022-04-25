import '../style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'
import * as dat from 'lil-gui'
import vertexShader from './shaders/fbm/vertex.glsl?raw'
import fragmentShader from './shaders/fbm/fragment.glsl?raw'

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 340 })
const debugObject = {}

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Water
 */
// Geometry
const waterGeometry = new THREE.PlaneGeometry(2, 2, 512, 512)

debugObject.depthColor = '#255f83'
debugObject.surfaceColor = '#8ab4c7'

// Material
const waterMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uLightPosition: { value: new THREE.Vector3(-1.3, 1, -1.1) },
  },
})

// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial)
water.rotation.x = -Math.PI * 0.5
scene.add(water)

console.log(waterGeometry)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0.8, 0.8, 0.4)
camera.lookAt(0.2, 0.1, 0)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// const controls = new FlyControls(camera, canvas)
// controls.movementSpeed = 10
// controls.rollSpeed = Math.PI / 10
// controls.autoForward = false
// controls.dragToLook = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const rtTexture = new THREE.WebGLRenderTarget(sizes.width, sizes.height, {
  minFilter: THREE.LinearFilter,
  magFilter: THREE.NearestFilter,
  format: THREE.RGBAFormat,
  type: THREE.FloatType,
})

/**
 * Animate
 */
const clock = new THREE.Clock()

const cameraPisition = document.querySelector('#position')
const cameraLookAt = document.querySelector('#look-at')
let cameraDirection = new THREE.Vector3()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  waterMaterial.uniforms.uTime.value = elapsedTime
  // water.rotation.z += 0.001

  // Update controls
  controls.update()
  // controls.update(0.01)

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  // window.requestAnimationFrame(tick)

  camera.getWorldDirection(cameraDirection)
  cameraPisition.innerHTML = `Position: (${camera.position.x.toFixed(1)}, ${camera.position.y.toFixed(
    1
  )}, ${camera.position.z.toFixed(1)})`
  cameraLookAt.innerHTML = `LookAt: (${(camera.position.x + cameraDirection.x).toFixed(1)}, ${(
    camera.position.y + cameraDirection.y
  ).toFixed(1)}, ${(camera.position.z + cameraDirection.z).toFixed(1)})`
}

gui.add(camera.position, 'x').min(0).max(10).step(0.01).name('camera.x')
gui.add(camera.position, 'y').min(0).max(10).step(0.01).name('camera.y')
gui.add(camera.position, 'z').min(0).max(10).step(0.01).name('camera.z')
gui.add(waterMaterial.uniforms.uLightPosition.value, 'x').min(-5).max(5).step(0.01).name('uLightPositionX')
gui.add(waterMaterial.uniforms.uLightPosition.value, 'y').min(-5).max(5).step(0.01).name('uLightPositionY')
gui.add(waterMaterial.uniforms.uLightPosition.value, 'z').min(-5).max(5).step(0.01).name('uLightPositionZ')

tick()
