export const fillCircle = (ctx, x, y, radius) => {
  ctx.save()
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.fill()
  ctx.restore()
}
