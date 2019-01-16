import Scene from '../scene'

export default class OptimizeState extends Scene {
  constructor () {
    super({key: 'optimizeState'})
    this.inputs = {
      btn0: {},
      btn1: {},
      btn2: {},
      btn3: {},
      btn4: {}
    }
  }

  create (params) {
    super.create(params)

    // add listeners for news optimization
    this.io.registerListener('BTN-0', this.handleButton)
    this.io.registerListener('BTN-1', this.handleButton)
    this.io.registerListener('BTN-2', this.handleButton)
    this.io.registerListener('BTN-3', this.handleButton)
    this.io.registerListener('BTN-4', this.handleButton)

    // add the keys that will be used in the Web standalone version
    this.keys = this.input.keyboard.addKeys({
      // assign keys for optimization
      btn0: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      btn1: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      btn2: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F),
      btn3: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
      btn4: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
    })
  }

  update(time, delta) {
    // check optimization buttons that have been pressed
    this.inputs = {
      btn0: this.keys.btn0.isDown || this.io.Inputs['BTN-0'].pressed,
      btn1: this.keys.btn1.isDown || this.io.Inputs['BTN-1'].pressed,
      btn2: this.keys.btn2.isDown || this.io.Inputs['BTN-2'].pressed,
      btn3: this.keys.btn3.isDown || this.io.Inputs['BTN-3'].pressed,
      btn4: this.keys.btn4.isDown || this.io.Inputs['BTN-4'].pressed
    }

    if (this.inputs.btn0) {
      console.log('pressed optimization button A')
    }
    if (this.inputs.btn1) {
      console.log('pressed optimization button B')
    }
    if (this.inputs.btn2) {
      console.log('pressed optimization button C')
    }
    if (this.inputs.btn3) {
      console.log('pressed optimization button D')
    }
    if (this.inputs.btn4) {
      console.log('pressed optimization button E')
    }
  }

}