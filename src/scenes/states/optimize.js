import Scene from '../scene'

export default class OptimizeState extends Scene {
  constructor () {
    super({key: 'optimizeState'})
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
    let optimizationInput = {
      optA: this.keys.btn0.isDown || this.io.Inputs['BTN-0'].pressed,
      optB: this.keys.btn1.isDown || this.io.Inputs['BTN-1'].pressed,
      optC: this.keys.btn2.isDown || this.io.Inputs['BTN-2'].pressed,
      optD: this.keys.btn3.isDown || this.io.Inputs['BTN-3'].pressed,
      optE: this.keys.btn4.isDown || this.io.Inputs['BTN-4'].pressed
    }

    if (optimizationInput.optA) {
      console.log('pressed optimization button A')
    }
    if (optimizationInput.optB) {
      console.log('pressed optimization button B')
    }
    if (optimizationInput.optC) {
      console.log('pressed optimization button C')
    }
    if (optimizationInput.optD) {
      console.log('pressed optimization button D')
    }
    if (optimizationInput.optE) {
      console.log('pressed optimization button E')
    }
  }

}