import Environment from './Environment'
import Floor from './Floor'
import Fox from './Fox'

export default class World {
  constructor(experience) {
    this.experience = experience
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    // const testMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial())

    // this.scene.add(testMesh)

    this.resources.on('ready', () => {
      this.floor = new Floor(this.experience)
      this.fox = new Fox(this.experience)
      this.environment = new Environment(this.experience)
    })
  }

  update() {
    if (this.fox) {
      this.fox.update()
    }
  }
}
