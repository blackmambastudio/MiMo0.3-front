import Scene from '../scene'

export default class EditIdleState extends Scene {
  constructor () {
    super({key: 'editIdleState'})
  }

  create (params) {
    super.create(params)
    this.io.registerListener('BTN-A', this.buttonA)
    this.io.registerListener('BTN-F', this.buttonF)
  }

  buttonA() {
    console.log('on A pressed!!')
  }

  buttonF() {
    console.log('on F pressed!!')
  }

}