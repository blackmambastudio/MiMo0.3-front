import Scene from '../scene'

export default class FocusMiniGameScene extends Scene {
  constructor () {
    super({key: 'FocusMiniGameScene'})

    this.optimizeState = null
    this.rotating = {
      pieceA: false,
      pieceB: false,
      pieceC: false,
      pieceD: false,
      pieceE: false
    }
    this.imageName = 'tv_control_room'
    this.pieceValue = 0

    // prevents the scene to excecute code not necessary when the mini-game finishes,
    // either by time or by completion
    this.finished = false
    this.started = false
  }

  create (params) {
    super.create(params)

    this.titleText.setVisible(false)

    // get the reference to the scene that will be reading inputs from the player
    this.optimizeState = this.scene.get('optimizeState')

    // add to the scene the sprites and other things that will be affected by the player
    this.background = this.add.image(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2 + 32,
      this.imageName + '-background'
    )
    this.background.setAlpha(0)

    // create the pieces and put them into a Phaser.Container
    this.piecesContainer = this.add.container(0, 32)

    // x and y positions took from Illustrator
    this.pieceA = this.add.image(124, 190, this.imageName + '-pieceA')
    this.pieceB = this.add.image(320, 190, this.imageName + '-pieceB')
    this.pieceC = this.add.image(516, 190, this.imageName + '-pieceC')
    this.pieceD = this.add.image(222, 324, this.imageName + '-pieceD')
    this.pieceE = this.add.image(418, 324, this.imageName + '-pieceE')

    this.piecesContainer.add(this.pieceA)
    this.piecesContainer.add(this.pieceB)
    this.piecesContainer.add(this.pieceC)
    this.piecesContainer.add(this.pieceD)
    this.piecesContainer.add(this.pieceE)

    // rotate the pieces to a random degree and start the mini-game
    this.piecesContainer
      .iterate(piece => piece.angle = 90 * Phaser.Math.Between(1, 3))
    this.piecesContainer.setAlpha(0)

    // setup data
    this.pieceValue = this.optimizeState.maxScore / this.piecesContainer.length
  }

  update(time, delta) {
    if (this.finished === true || this.started === false) {
      return
    }

    this.background.setAlpha(0.4)
    let piecesInPlace = 0
    this.optimizeState.score = 0

    // call the update function that reads inputs from the player
    this.optimizeState.update()

    // check if any of the buttons used by the mini-game is pressed
    if (this.optimizeState.inputs.btn0) {
      this.rotatePiece(this.pieceA, 'optA')
    }
    if (this.optimizeState.inputs.btn1) {
      this.rotatePiece(this.pieceB, 'optB')
    }
    if (this.optimizeState.inputs.btn2) {
      this.rotatePiece(this.pieceC, 'optC')
    }
    if (this.optimizeState.inputs.btn3) {
      this.rotatePiece(this.pieceD, 'optD')
    }
    if (this.optimizeState.inputs.btn4) {
      this.rotatePiece(this.pieceE, 'optE')
    }

    // check if the player won the mini-game
    this.piecesContainer.iterate(piece => {
      if (piece.angle === 0) {
        // when a piece is in place, add opacity to the background image
        this.background.alpha += 0.12

        // TODO: add more feedback animations and sounds here

        piecesInPlace++
        this.optimizeState.score = piecesInPlace * this.pieceValue
      }
    })

    if (piecesInPlace === this.piecesContainer.length) {
      this.finished = true
      // TODO: make something happen before the scene is stopped

      this.optimizeState.finishMiniGame()
    }
  }

  /**
   * Make a given image (piece) rotate with a tween.
   * @param {Phaser.Image} piece The image (piece) to rotate
   * @param {String} pieceName The name of the piece that will be marked as rotating
   */
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

  start() {
    this.started = true
    this.piecesContainer.setAlpha(1)
  }
}