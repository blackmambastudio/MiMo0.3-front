import Scene from '../scene'

export default class DramaMiniGameScene extends Scene {
  constructor () {
    super({key: 'DramaMiniGameScene'})

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
  }
}