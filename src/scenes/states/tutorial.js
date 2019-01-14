import Scene from '../scene'

export default class TutorialState extends Scene {
  constructor () {
    super({key: 'tutorialState'})
    this.nextScene = 'editIdleState'
  }

  create (params) {
    super.create(params)

    this.time.delayedCall(2000, () => {
      this.changeToScene(this.nextScene)
    }, [], this)
  }

}