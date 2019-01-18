/**
 * This class will be in charge of registering and listening inputs from the
 * player so any mini-game launched with it can use that to apply its respective
 * rules.
 */
import Scene from '../scene'
import fonts from '../../config/fonts'

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
    this.timeLimit = 30
    this.score = 0
    this.maxScore = 100
    // this.currentMiniGame = null // use this while no developing
  }

  create (params) {
    super.create(params)

    // add to the scene the sprites and other things that will be affected by the player
    this.titleText.setFontSize(44)
    this.titleText.setText('00:' + this.timeLimit)

    this.preparationText = this.make.text({
      x: this.sys.game.config.width / 2,
      y: this.sys.game.config.height / 2,
      text: 'READY',
      style: this.fonts.default
    })
    this.preparationText.setTint('0xFFFF00')
    this.preparationText.setStroke('#FFFFFF', 2)
    this.preparationText.setFontSize(64)
    this.preparationText.setOrigin(0.5)
    this.preparationText.setVisible(true)

    // assign the listeners for the keyboard and the physical MiMo
    this.registerListeners()

    // load a random mini-game
    if (!this.currentMiniGame) {
      this.currentMiniGame = this.miniGames[
        Phaser.Math.Between(0, this.miniGames.length - 1)
      ]
    }
    this.scene.stop(this.currentMiniGame)
    this.scene.launch(this.currentMiniGame)

    // bring this scene to top so the timer is rendered on top of the mini-game
    this.scene.bringToTop('optimizeState')

    // TODO: show the messages: READY... OPTIMIZE!, then start the mini-game
    this.time.delayedCall(2000, _ => {
      this.preparationText.setText('OPTIMIZE!')
      this.time.delayedCall(1000, _ => {
        this.preparationText.setVisible(false)
        this.startMiniGame()
      }, null, this)
    }, null, this)
  }

  registerListeners() {
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

  startMiniGame() {
    this.scene.get(this.currentMiniGame).start()

    this.countdown = this.time.addEvent({
      delay: 1000,
      repeat: this.timeLimit - 1,
      loop: false,
      callback: () => {
        this.titleText.setText('00:' + this.countdown.repeatCount)
        
        if (this.countdown.repeatCount < 10) {
          this.titleText.setText('00:0' + this.countdown.repeatCount)
          this.titleText.setTint('0xFF0000')

          if (
            this.countdown.repeatCount === 0 &&
            this.scene.get(this.currentMiniGame).finished === false
          ) {
            this.finishMiniGame()
          }
        }

      },
      callbackScope: this
    })
  }

  finishMiniGame() {
    this.countdown.remove()
    this.scene.stop(this.currentMiniGame)
    this.preparationText.text = 'Results: ' + this.score + '%'
    this.preparationText.setVisible(true)

    // TODO: show something to the player... like a confirmation message
    // that informs her that the edited and optimized news will be telecasted, and
    // her "score"
  }
}