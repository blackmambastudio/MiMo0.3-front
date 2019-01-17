/**
 * This class will be in charge of registering and listening inputs from the
 * player so any mini-game launched with it can use that to apply its respective
 * rules.
 */
import Scene from '../scene'

export default class OptimizeState extends Scene {
  constructor () {
    super({key: 'optimizeState'})

    // the key of each of the Scenes that has a mini-game
    this.miniGames = [
      'FocusMiniGameScene',
      'TuningMiniGameScene',
      'DramaMiniGameScene'
    ]
    this.currentMiniGame = this.miniGames[0]
    // this.currentMiniGame = null // use this while no developing
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

    // load a random mini-game
    if (!this.currentMiniGame) {
      this.currentMiniGame = this.miniGames[
        Phaser.Math.Between(0, this.miniGames.length - 1)
      ]
    }
    this.scene.stop(this.currentMiniGame)
    this.scene.launch(this.currentMiniGame)

    this.titleText.text += ' - ' + this.currentMiniGame
  }

  update() {
    // check optimization buttons that have been pressed
    this.inputs = {
      btn0: this.keys.btn0.isDown || this.io.Inputs['BTN-0'].pressed,
      btn1: this.keys.btn1.isDown || this.io.Inputs['BTN-1'].pressed,
      btn2: this.keys.btn2.isDown || this.io.Inputs['BTN-2'].pressed,
      btn3: this.keys.btn3.isDown || this.io.Inputs['BTN-3'].pressed,
      btn4: this.keys.btn4.isDown || this.io.Inputs['BTN-4'].pressed
    }
  }

  finishMiniGame() {
    this.scene.stop(this.currentMiniGame)

    // TODO: show something to the player... like a confirmation message
    // that informs her that the edited and optimized news will be telecasted, and
    // her "score"
  }
}