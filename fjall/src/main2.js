import '../style.css'
import { noise2D, fbm } from './utils/noise'
import { fill } from './utils/sampling'
import { fillCircle } from './utils/fill'

import * as createCamera from 'perspective-camera'

const sizes = {
  width: 0,
  height: 0,
}

const fillNoise = (context, camera) => {
  console.log('fillNoise')
  const points = fill(sizes.width, sizes.height)

  context.fillStyle = '#666'
  context.scale(1, -1)
  context.translate(0, -sizes.height)
  let strength = 0
  const multiplier = 0.002
  for (let i = 0; i < points.length; i++) {
    strength = fbm(points[i][0] * multiplier, points[i][1] * multiplier)
    strength += 1
    strength *= 120
    strength = ~~strength

    const projectedPoint = camera.project([points[i][0], strength, points[i][1]])

    // context.fillStyle = `rgb(${strength}, ${strength}, ${strength})`

    fillCircle(context, projectedPoint[0], projectedPoint[1], 1)
    // fillCircle(context, points[i][0], points[i][1], 2)
  }
}

const resetCanvas = (el) => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  const pixelRatio = window.devicePixelRatio ?? 2
  el.style.width = `${sizes.width}px`
  el.style.height = `${sizes.height}px`
  el.width = sizes.width * pixelRatio
  el.height = sizes.height * pixelRatio
}

const setupCamera = () => {
  const camera = createCamera({
    fov: Math.PI / 3,
    near: 0.1,
    far: 1000,
    viewport: [0, 0, sizes.width, sizes.height],
  })

  camera.identity()

  camera.translate([~~(sizes.width / 2), 1000, 1500])
  // camera.lookAt([sizes.width / 2, 50, sizes.height])
  camera.lookAt([~~(sizes.width / 2), 10, ~~(sizes.height / 2)])
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
