import Scene from '../scene'
import OptimizeState from '../scene'

export default class FocusMiniGameScene extends Scene {
  constructor () {
    super({key: 'FocusMiniGameScene'})

    this.rotating = {
      pieceA: false,
      pieceB: false,
      pieceC: false,
      pieceD: false,
      pieceE: false
    }

    this.finished = false
  }

  create (params) {
    super.create(params)

    this.titleText.setVisible(false)

    // add to the scene sprites and other things that will be affected by the player
    this.createWorld()

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

  createWorld() {
    this.piecesContainer = this.add.container(128, 128 + 16)

    this.pieceA = this.add.sprite(0, 0, 'pieceA')
    this.pieceB = this.add.sprite(192, 0, 'pieceB')
    this.pieceC = this.add.sprite(192 * 2, 0, 'pieceC')
    this.pieceD = this.add.sprite((64 + 32), 128, 'pieceD')
    this.pieceE = this.add.sprite((64 + 32) + 192, 128, 'pieceE')

    this.piecesContainer.add(this.pieceA)
    this.piecesContainer.add(this.pieceB)
    this.piecesContainer.add(this.pieceC)
    this.piecesContainer.add(this.pieceD)
    this.piecesContainer.add(this.pieceE)

    // this.piecesContainer.setScale(0.5)

    // rotate the pieces to a random degree and start the mini-game
    this.piecesContainer
      .iterate(piece => piece.angle = 0 + (90 * Phaser.Math.Between(0, 3)))
  }

  update(time, delta) {
    if (this.finished === true) {
      return
    }

    let piecesInPlace = 0

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
      this.rotatePiece(this.pieceA, 'optA')
    }
    if (this.inputs.btn1) {
      console.log('pressed optimization button B')
      this.rotatePiece(this.pieceB, 'optB')
    }
    if (this.inputs.btn2) {
      console.log('pressed optimization button C')
      this.rotatePiece(this.pieceC, 'optC')
    }
    if (this.inputs.btn3) {
      console.log('pressed optimization button D')
      this.rotatePiece(this.pieceD, 'optD')
    }
    if (this.inputs.btn4) {
      console.log('pressed optimization button E')
      this.rotatePiece(this.pieceE, 'optE')
    }

    // check if the player won the mini-game
    this.piecesContainer.iterate(piece => piece.angle === 0 && piecesInPlace++)

    if (piecesInPlace === this.piecesContainer.length) {
      alert('A winner is you!!!')
      this.finished = true
    }
  }

  rotatePiece(piece, pieceName) {
    if (!this.rotating[pieceName]) {
      this.rotating[pieceName] = true

      this.tweens.add({
        targets: [piece],
        // angle destination
        angle: piece.angle + 90,
        // tween duration
        duration: Phaser.Math.Between(300, 500),
        // tween easing
        ease: "Cubic.easeOut",
        // callback scope
        callbackScope: this,
        // function to be executed once the tween has been completed
        onComplete: function(tween, targets) {
          this.rotating[pieceName] = false
          console.log(targets[0].angle)
        }
      });
    }
  }
}