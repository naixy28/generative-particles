import { interpolate } from 'popmotion'
import chroma from 'chroma-js'

const minRadiusInterpolate = interpolate([0, 1], [0, 3])
const maxRadiusInterpolate = interpolate([0, 1], [0, 4])
const random = (min, max) => (Math.random() > 0.5 ? min : max)

const colorMap = chroma.scale(['#f7daad', '#364a44', '#1a303e', '#1a303e']).mode('lab').domain([0, 5])

const o = 0.4
const p = 0.8

export const fillCircle = (ctx, x, y, height, lightStrength) => {
  ctx.save()
  ctx.fillStyle = colorMap(height * 10)
  ctx.beginPath()
  const radius = random(
    Math.pow(minRadiusInterpolate(lightStrength * height * 2), p) + o,
    Math.pow(maxRadiusInterpolate(lightStrength * height * 2), p) + o
  )
  ctx.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.fill()
  ctx.restore()
}
