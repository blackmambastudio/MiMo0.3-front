import Scene from '../scene'
import OptimizeState from '../scene'

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

    // prevents the scene to excecute code not necessary when the mini-game finishes,
    // either by time or by completion
    this.finished = false
  }

  create (params) {
    super.create(params)

    this.titleText.setVisible(false)

    // get the reference to the scene that will be reading inputs from the player
    this.optimizeState = this.scene.get('optimizeState')

    // add to the scene the sprites and other things that will be affected by the player
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

    // call the update function that reads inputs from the player
    this.optimizeState.update()

    // check if any of the buttons used by the mini-game is pressed
    if (this.optimizeState.inputs.btn0) {
      console.log('pressed optimization button A')
      this.rotatePiece(this.pieceA, 'optA')
    }
    if (this.optimizeState.inputs.btn1) {
      console.log('pressed optimization button B')
      this.rotatePiece(this.pieceB, 'optB')
    }
    if (this.optimizeState.inputs.btn2) {
      console.log('pressed optimization button C')
      this.rotatePiece(this.pieceC, 'optC')
    }
    if (this.optimizeState.inputs.btn3) {
      console.log('pressed optimization button D')
      this.rotatePiece(this.pieceD, 'optD')
    }
    if (this.optimizeState.inputs.btn4) {
      console.log('pressed optimization button E')
      this.rotatePiece(this.pieceE, 'optE')
    }

    // check if the player won the mini-game
    this.piecesContainer.iterate(piece => piece.angle === 0 && piecesInPlace++)

    if (piecesInPlace === this.piecesContainer.length) {
      // TODO: make something happen before the scene is stopped
      this.finished = true
      alert('A winner is you!!!')

      this.optimizeState.finishMiniGame()
    }
  }

  /**
   * Make a given sprite (piece) rotate with a tween.
   * @param {Phaser.Sprite} piece The sprite (piece) to rotate
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
}