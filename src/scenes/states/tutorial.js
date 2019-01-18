import Scene from '../scene'

export default class TutorialState extends Scene {
  constructor () {
    super({key: 'tutorialState'})
    this.nextScene = 'editIdleState' // original
    
    this.materialKeys = [
      'mtlL1',
      'mtlL2',
      'mtlL3',
      'mtlR1',
      'mtlR2',
      'mtlR3'
    ]
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
    this.materialIconsContainer = this.add.container(0, 0)
    for (let index = 0; index < 6; index++) {
      let image = this.add.image(
        this.materialPositions[index].x,
        this.materialPositions[index].y,
        this.materialKeys[index]
      )
      this.materialIconsContainer.add(image)
      image.alpha = 0
    }

    this.opt_knobs = this.add.image(640, 325, 'opt_knobs')
    this.opt_buttons = this.add.image(640, 447, 'opt_buttons')

    this.opt_knobs.setAlpha(0)
    this.opt_buttons.setAlpha(0)

    this.printer01 = this.add.image(380, 181, 'printer-01')
    this.printer02 = this.add.image(380, 181, 'printer-02')
    this.printer03 = this.add.image(380, 181, 'printer-03')

    this.printer01.setOrigin(0.5, 1)
    this.printer02.setOrigin(0.5, 1)
    this.printer03.setOrigin(0.5, 1)

    this.printer01.setAlpha(0)
    this.printer02.setAlpha(0)
    this.printer03.setAlpha(0)

    this.startAnimations()

    /* this.time.delayedCall(1000, () => {
      this.changeToScene(this.nextScene)
    }, [], this) */
  }

  startAnimations() {
    this.tweens.add({
      targets: [this.logo],
      alpha: 1,
      duration: 2000,
      ease: "Cubic.easeOut", 
      callbackScope: this,
      onComplete: function(tween, targets) {
        // TODO: ???
      }
    });
  }

}