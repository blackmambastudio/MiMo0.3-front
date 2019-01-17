import Scene from '../scene'

export default class BootState extends Scene {
  constructor () {
    super({key: 'bootState'})
    // this.nextScene = 'tutorialState' // use this when not developing
    this.nextScene = 'optimizeState'
  }

  create (params) {
    super.create(params)
    this.io.displayOnLCD(22, 'booting mimo', 1)
    this.io.displayOnLCD(27, 'feel the power', 2)

    this.time.delayedCall(2000, () => {
      this.changeToScene(this.nextScene)
    }, [], this)
  }

}