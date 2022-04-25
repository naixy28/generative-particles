import { interpolate } from 'popmotion'
import chroma from 'chroma-js'

const radiusInterpolate = interpolate([0, 0.5], [1, 5])
const minRadiusInterpolate = interpolate([0, 0.5], [0, 3])
const maxRadiusInterpolate = interpolate([0, 0.5], [0, 4])
const random = (min, max) => (Math.random() > 0.3 ? min : max)

const colorMap = chroma.scale(['#f7daad', '#364a44', '#1a303e', '#1a303e']).mode('lab').domain([0, 5])

export const fillCircle = (ctx, x, y, height, lightStrength) => {
  ctx.save()
  ctx.fillStyle = colorMap(height * 10)
  ctx.beginPath()
  ctx.arc(
    x,
    y,
    random(minRadiusInterpolate(lightStrength + height), maxRadiusInterpolate(lightStrength + height)),
    0,
    2 * Math.PI
  )
  ctx.fill()
  ctx.restore()
}
