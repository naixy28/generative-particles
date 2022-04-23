import PoissonDiskSampling from 'poisson-disk-sampling'

export const fill = (width, height) => {
  const pds = new PoissonDiskSampling({
    shape: [width, height],
    minDistance: 3,
    maxDistance: 4,
    tries: 30,
    // distanceFunction(point) {

    // }
  })

  return pds.fill()
}
