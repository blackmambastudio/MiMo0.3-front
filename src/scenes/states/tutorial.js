import Scene from '../scene'

export default class TutorialState extends Scene {
  constructor () {
    super({key: 'tutorialState'})
    this.nextScene = 'editIdleState' // original
    
    this.materialKeys = [
      'mtlL1',
      'mtlL2',
      'mtlL3',
      'mtlR1',
      'mtlR2',
      'mtlR3'
    ]
    this.materialColors = [
      0xFC003C,
      0xFFF000,
      0x06EA5C,
      0xFFAE00,
      0x0066FF,
      0xFA03F8
    ]
    this.materialPositions = [
      {x: 301, y: 292},
      {x: 301, y: 365},
      {x: 301, y: 443},
      {x: 979, y: 292},
      {x: 979, y: 365},
      {x: 979, y: 443}
    ]
  }

  create (params) {
    super.create(params)

    // setup the text that will be used for the process titles
    this.titleText.setText('')
    this.titleText.setFontSize(44)
    this.titleText.y = 546
    this.titleText.setAlign('center')

    this.subtitleText = this.make.text({
      x: this.sys.game.config.width / 2,
      y: this.titleText.y + 64,
      text: '',
      style: this.fonts.default
    })
    this.subtitleText.setOrigin(0.5)
    this.subtitleText.setFontFamily('vcrosdmono')
    this.subtitleText.setFontSize(32)
    this.subtitleText.setAlign('center')

    // add to the scene the sprites and other things that will be affected by the player
    this.mimo_blueprint = this.add.image(640, 265, 'mimo_blueprint')
    this.mimo_blueprint.setAlpha(0)
    
    // AUDIO

    this.SFX_Tut_Print = this.sound.add('SFX_Tut_Print')

    this.SFX_Tut_Mat = this.sound.add('SFX_Tut_Mat')
    
    this.SFX_Tut_Opt = this.sound.add('SFX_Tut_Opt')

    this.SFX_Tut_St = this.sound.add('SFX_Tut_St')

    this.SFX_Tut_End = this.sound.add('SFX_Tut_End')

    // material icons
    this.materialIconsContainer = this.add.container(0, 0)
    for (let index = 0; index < 6; index++) {
      let image = this.add.image(
        this.materialPositions[index].x,
        this.materialPositions[index].y,
        this.materialKeys[index]
      )
      this.materialIconsContainer.add(image)
      image.alpha = 0
      image.index = 1
    }

    this.optimizationIconsContainer = this.add.container(0, 0)

    this.opt_knobs = this.add.image(640, 325, 'opt_knobs')
    this.opt_buttons = this.add.image(640, 447, 'opt_buttons')

    this.opt_knobs.setAlpha(0)
    this.opt_buttons.setAlpha(0)

    this.optimizationIconsContainer.add(this.opt_knobs)
    this.optimizationIconsContainer.add(this.opt_buttons)

    this.printersContainer = this.add.container(0, 0)

    this.printer01 = this.add.image(380, 181, 'printer-01')
    this.printer02 = this.add.image(380, 181, 'printer-02')
    this.printer03 = this.add.image(380, 181, 'printer-03')

    this.printer01.setOrigin(0.5, 1)
    this.printer02.setOrigin(0.5, 1)
    this.printer03.setOrigin(0.5, 1)

    this.printer01.setAlpha(0)
    this.printer02.setAlpha(0)
    this.printer03.setAlpha(0)

    this.printersContainer.add(this.printer01)
    this.printersContainer.add(this.printer02)
    this.printersContainer.add(this.printer03)

    this.showBluePrint()
  }

  useAlphaTween(config) {
    this.tweens.add({
      targets: [config.target],
      alpha: config.alpha,
      duration: config.duration || 1000,
      ease: "Cubic.easeOut", 
      callbackScope: this,
      onComplete: config.callback
    });
  }

  showBluePrint() {
    this.useAlphaTween({
      target: this.mimo_blueprint,
      duration: 2000,
      alpha: 1,
      callback: _ => {
        this.SFX_Tut_St.play()
        this.titleText.setText('-- M.I.M.O. VERIFICATION PROCESS --')
        this.time.delayedCall(2000, this.highlightPrinter, null, this)
      }
    })
  }

  highlightPrinter() {
    this.useAlphaTween({
      target: this.mimo_blueprint,
      alpha: 0.25,
      duration: 500
    })

    let currentPrinter = 0
    
    this.useAlphaTween({
      
      target: this.printer01,
      alpha: 1,
      duration: 1000,
      callback: _ => {
        this.titleText.setText('VERIFYING PRINTER')
        this.subtitleText.setText('READ EACH INCOMING EVENT AND USE THE MATERIAL\nATTACHED TO IT TO TRANSFORM IT INTO THE NEWS')

        this.SFX_Tut_Print.play()

        this.io.printerMessage('SYSTEM CHECK', 'M.I.M.O.', 'VERIFYING PRINTER')

        this.printerAnimation = this.time.addEvent({
          delay: 500,
          repeat: 7,
          loop: false,
          callback: () => {
            this.printersContainer.getAt(currentPrinter++).setAlpha(0)
            if (currentPrinter > 2){
              currentPrinter = 0
              this.io.printerMessage('NEWS PROVIDER', 'OK', '...')
            } 
            this.printersContainer.getAt(currentPrinter).setAlpha(1)
          },
          callbackScope: this
        })

        this.time.delayedCall(5000, this.highlightMaterial, null, this)
      }
    })
  }

  highlightMaterial() {
    this.printersContainer.iterate(icon => {
      this.useAlphaTween({
        target: icon,
        alpha: 0,
        duration: 500
      })
    })

    this.printerAnimation.remove()

    

    this.titleText.setText('VERIFYING MATERIAL PANEL')
    this.subtitleText.setText('PRESS EACH BUTTON TO SELECT THE MATERIAL\nYOU WANT TO USE TO EVOKE AN EMOTION IN THE CURRENT NEWS')

    this.SFX_Tut_Mat.play()
    let spacingTime = 100
    let delay = 200
    this.playLightSequenceComplex([15,29,31,13,35,33], delay, spacingTime)
    this.playLightSequenceComplex([15,29,31,13,35,33], 1400, spacingTime)
    this.playLightSequenceComplex([15,29,31,13,35,33], 2800, spacingTime)
    this.playLightSequenceComplex([15,29,31,13,35,33], 4200, spacingTime)
    this.playLightSequenceComplex([15,29,31,13,35,33], 5400, spacingTime/2)
    this.playLightSequenceComplex([15,29,31,13,35,33], 6000, spacingTime/2)
    

    this.materialIconsContainer.iterate(icon => {
      this.useAlphaTween({
        target: icon,
        alpha: 1,
        duration: 500 + (1000 * icon.index)
      })
    })
    this.time.delayedCall(6500, this.highlightOptimization, null, this)
  }

  blink(id, start, delay){
    this.time.delayedCall(start, () => {
      this.io.turnOnLight(id)
    }, [], this)
    this.time.delayedCall(start+delay, () => {
      this.io.turnOffLight(id)
    }, [], this)    
  }

  playLightSequence(sequence){
    //console.log(sequence)
    for (var i = 0; i < sequence.length; i++) {
      let light = sequence[i]
      this.blink(light[0], light[1], light[2])
    }
  }

  playLightSequenceComplex(sequence, delay, spacingTime){
    for (var i = 0; i < sequence.length; i++) {
      sequence[i] = [sequence[i], delay+spacingTime*0, spacingTime*4]  
    }
    this.playLightSequence(sequence)
  }

  highlightOptimization() {
    this.materialIconsContainer.iterate(icon => {
      this.useAlphaTween({
        target: icon,
        alpha: 0,
        duration: 500
      })
    })

    this.titleText.setText('VERIFYING OPTIMIZATION PANEL')
    this.subtitleText.setText('USE THE KNOBS AND BUTTONS TO IMPROVE THE IMPACT\nOF THE EVOKED EMOTION')

    this.SFX_Tut_Opt.play()

    this.optimizationIconsContainer.iterate(icon => {
      this.useAlphaTween({
        target: icon,
        alpha: 1,
        duration: 500 + (1000 * icon.index)
      })
    })
    this.time.delayedCall(6000, this.showWelcome, null, this)
  }

  showWelcome() {
    this.SFX_Tut_End.play()
    this.titleText.setText('-- M.I.M.O. VERIFICATION COMPLETE --')
      this.subtitleText.setText('ALL SYSTEMS WORKING.\nWELCOME!\nYOU CAN START MANUFACTURING THE NEWS.')
    
    this.printersContainer.iterate(icon => {
      this.useAlphaTween({
        target: icon,
        alpha: 1,
        duration: 2000
      })
    })

    this.materialIconsContainer.iterate(icon => {
      this.useAlphaTween({
        target: icon,
        alpha: 1,
        duration: 2000
      })
    })

    this.useAlphaTween({
      target: this.mimo_blueprint,
      alpha: 1,
      duration: 2000,
      callback: _ => {
        this.time.delayedCall(
          1500,
          _ => this.changeToScene(this.nextScene),
          null,
          this
        )
      }
    })

    let spacingTime = 250
    let delay = 200
    this.playLightSequenceComplex([15,29,31,13,35,33], delay, spacingTime)

  }
}