import Scene from '../scene'

export default class OptimizeState extends Scene {
  constructor () {
    super({key: 'optimizeState'})
  }

  create (params) {
    super.create(params)

    // load a random mini-game
    this.scene.stop('FocusMiniGameScene')
    this.scene.launch('FocusMiniGameScene')
  }
}