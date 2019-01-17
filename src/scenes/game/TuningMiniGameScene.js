import Scene from '../scene'

export default class TuningMiniGameScene extends Scene {
  constructor () {
    super({key: 'TuningMiniGameScene'})

    this.optimizeState = null

    // prevents the scene to excecute code not necessary when the mini-game finishes,
    // either by time or by completion
    this.finished = false
  }

  create (params) {
    super.create(params)

    this.titleText.setVisible(false)

    // get the reference to the scene that will be reading inputs from the player
    this.optimizeState = this.scene.get('optimizeState')

    // add to the scene the sprites and other things that will be affected by the player
    let graphics = this.add.graphics()
    let color = 0xffff00
    let thickness = 4
    let alpha = 1

    graphics.lineStyle(thickness, color, alpha)

    let a = new Phaser.Geom.Point(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2
    )
    let radius = 128

    graphics.strokeCircle(a.x, a.y, radius)
  }
}