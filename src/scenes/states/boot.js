import Scene from '../scene'

export default class BootState extends Scene {
  constructor () {
    super({key: 'bootState'})
    this.nextScene = 'tutorialState'
  }

  create (params) {
    super.create(params)

    this.time.delayedCall(2000, () => {
      this.changeToScene(this.nextScene)
    }, [], this)
  }

}