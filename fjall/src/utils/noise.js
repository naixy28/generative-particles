import SimplexNoise from 'simplex-noise'

const simplex = new SimplexNoise('some seed')

export const noise2D = (x, y) => simplex.noise2D(x, y)
export const noise3D = (x, y, z) => simplex.noise3D(x, y, z)

export const fbm = (x, z) => {
  let y = 0
  let w = 1
  let g = 0.5
  let f = 2

  for (let i = 0; i < 10; i++) {
    y += w * noise2D(x * f, z * f)
    w *= g
    f *= f
  }
  return y
}
