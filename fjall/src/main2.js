import '../style.css'
import { noise2D, fbm } from './utils/noise'
import { fill } from './utils/sampling'
import { fillCircle } from './utils/fill'

import * as createCamera from 'perspective-camera'

const sizes = {
  width: 0,
  height: 0,
  pixelWidth: 0,
  pixelHeight: 0,
}

const fillNoise = (context, camera) => {
  console.log('fillNoise')
  const points = fill(sizes.pixelWidth, sizes.pixelHeight)

  context.fillStyle = '#666'
  context.scale(-1, -1)
  context.translate(-sizes.pixelWidth, -sizes.pixelHeight)
  let strength = 0
  const multiplier = 0.003
  for (let i = 0; i < points.length; i++) {
    strength = fbm(points[i][0] * multiplier, points[i][1] * multiplier)
    // strength += 1
    strength *= 70
    // strength = ~~strength

    const projectedPoint = camera.project([points[i][0], strength, points[i][1]])

    // context.fillStyle = `rgb(${strength}, ${strength}, ${strength})`

    fillCircle(context, projectedPoint[0], projectedPoint[1], 1)
    // fillCircle(context, points[i][0], points[i][1], 2)
  }
}

const resetCanvas = (el) => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  const pixelRatio = 1
  el.style.width = `${sizes.width}px`
  el.style.height = `${sizes.height}px`
  sizes.pixelWidth = el.width = sizes.width * pixelRatio
  sizes.pixelHeight = el.height = sizes.height * pixelRatio
}

const setupCamera = () => {
  const camera = createCamera({
    fov: Math.PI / 5,
    near: 0.1,
    far: 1000,
    viewport: [0, 0, sizes.pixelWidth, sizes.pixelHeight],
  })

  camera.identity()

  camera.translate([~~(sizes.pixelWidth / 2), 1000, 100])
  camera.lookAt([sizes.pixelWidth / 2, sizes.pixelWidth / 50, sizes.pixelHeight / 2])
  // camera.lookAt([~~(0 / 2), 0, ~~(0 / 2)])
  camera.update()

  return camera
}

const main = () => {
  const canvasElement = document.querySelector('.webgl')
  const context = canvasElement.getContext('2d')
  resetCanvas(canvasElement)
  const camera = setupCamera()
  fillNoise(context, camera)
}

// window.addEventListener('resize', () => {
//   resetCanvas()
// })

main()
