import Scene from '../scene'

export default class OptimizeState extends Scene {
  constructor () {
    super({key: 'optimizeState'})

    this.rotating = {
      pieceA: false,
      pieceB: false,
      pieceC: false,
      pieceD: false,
      pieceE: false
    }
  }

  create (params) {
    super.create(params)

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
    this.pieceB = this.add.sprite(384, 0, 'pieceB')
    this.pieceC = this.add.sprite(384 * 2, 0, 'pieceC')
    this.pieceD = this.add.sprite((128 + 64), 256, 'pieceD')
    this.pieceE = this.add.sprite((128 + 64) + 384, 256, 'pieceE')

    this.pieceA.angle = 45
    this.pieceB.angle = 45
    this.pieceC.angle = 45
    this.pieceD.angle = 45
    this.pieceE.angle = 45

    this.piecesContainer.add(this.pieceA)
    this.piecesContainer.add(this.pieceB)
    this.piecesContainer.add(this.pieceC)
    this.piecesContainer.add(this.pieceD)
    this.piecesContainer.add(this.pieceE)

    this.piecesContainer.setScale(0.5)
  }

  update(time, delta) {
    // check optimization buttons that have been pressed
    let optInput = {
      optA: this.keys.btn0.isDown || this.io.Inputs['BTN-0'].pressed,
      optB: this.keys.btn1.isDown || this.io.Inputs['BTN-1'].pressed,
      optC: this.keys.btn2.isDown || this.io.Inputs['BTN-2'].pressed,
      optD: this.keys.btn3.isDown || this.io.Inputs['BTN-3'].pressed,
      optE: this.keys.btn4.isDown || this.io.Inputs['BTN-4'].pressed
    }

    if (optInput.optA) {
      console.log('pressed optimization button A')
      this.rotatePiece(this.pieceA, 'optA')
    }
    if (optInput.optB) {
      console.log('pressed optimization button B')
      this.rotatePiece(this.pieceB, 'optB')
    }
    if (optInput.optC) {
      console.log('pressed optimization button C')
      this.rotatePiece(this.pieceC, 'optC')
    }
    if (optInput.optD) {
      console.log('pressed optimization button D')
      this.rotatePiece(this.pieceD, 'optD')
    }
    if (optInput.optE) {
      console.log('pressed optimization button E')
      this.rotatePiece(this.pieceE, 'optE')
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