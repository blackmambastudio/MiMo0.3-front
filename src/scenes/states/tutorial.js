import Scene from '../scene'

export default class TutorialState extends Scene {
  constructor () {
    super({key: 'tutorialState'})
    this.nextScene = 'editIdleState' // original
    
    this.materialButtons = []
    this.materialColors = [
      0xFC003C,
      0xFFF000,
      0x06EA5C,
      0xFFAE00,
      0x0066FF,
      0xFA03F8
    ]
    this.materialPositions = [
      {x: 301, y: 292},
      {x: 301, y: 365},
      {x: 301, y: 443},
      {x: 979, y: 292},
      {x: 979, y: 365},
      {x: 979, y: 443}
    ]
  }

  create (params) {
    super.create(params)

    this.titleText.setVisible(false)

    // add to the scene the sprites and other things that will be affected by the player
    this.mimo_blueprint = this.add.image(640, 265, 'mimo_blueprint')
    
    // material icons
    for (let index = 0; index < 6; index++) {
      let image = this.add.image(
        this.materialPositions[index].x,
        this.materialPositions[index].y,
        'material_ico'
      )
      image.tintFill = true
      image.setTint(this.materialColors[index])
      this.materialButtons.push(image)
    }

    this.optimization_ico = this.add.image(640, 394, 'optimization_ico')

    this.printer01 = this.make.image(380, 177, 'printer-01')
    // this.printer02 = this.make.image(0, 0, 'printer-02')
    // this.printer03 = this.make.image(0, 0, 'printer-03')

    /* this.time.delayedCall(1000, () => {
      this.changeToScene(this.nextScene)
    }, [], this) */
  }

}