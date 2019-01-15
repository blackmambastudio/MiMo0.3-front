import Scene from '../scene'

export default class EditIdleState extends Scene {
  constructor () {
    super({key: 'editIdleState'})
  }

  create (params) {
    super.create(params)
    this.io.registerListener('BTN-A', this.handleButton)
    this.io.registerListener('BTN-B', this.handleButton)
    this.io.registerListener('BTN-C', this.handleButton)
    this.io.registerListener('BTN-D', this.handleButton)
    this.io.registerListener('BTN-E', this.handleButton)
    this.io.registerListener('BTN-F', this.handleButton)
    this.io.registerListener('BTN-0', this.handleButton)
    this.io.registerListener('BTN-1', this.handleButton)
    this.io.registerListener('BTN-2', this.handleButton)
    this.io.registerListener('BTN-3', this.handleButton)
    this.io.registerListener('BTN-4', this.handleButton)
  }

  handleButton(data) {
    console.log('action received', data)
  }

  buttonF(data) {
    console.log('on F pressed!!', data)
  }

  update() {
    if(this.io.Inputs['BTN-0'].pressed){
      console.log('woooo')
    }
  }

}