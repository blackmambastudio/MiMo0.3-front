import Scene from '../scene'

export default class BootState extends Scene {
  constructor () {
    super({key: 'bootState'})
    this.nextScene = 'optimizeState' // use this when not developing
  }

  create (params) {
    super.create(params)

    this.titleText.setVisible(false)

    // add to the scene the sprites and other things that will be affected by the player
    this.logo = this.add.image(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2,
      'logo_MCorp'
    )
    this.logo.setAlpha(0)

    this.SFX_MimoLogo = this.sound.add('SFX_MimoLogo')

    // show the logo and after it finishes change to the tutorial scene
    // TODO: play the fancy sound effect of MCorp
    this.SFX_MimoLogo.play()
    this.tweens.add({
      
     
      targets: [this.logo],
      alpha: 1,
      duration: 2000,
      ease: "Cubic.easeOut", 
      callbackScope: this,
      yoyo: true,
      onComplete: function(tween, targets) {
        this.changeToScene(this.nextScene)
      }
    });

    
    for (var i = 0; i < 6; i++) {
      this.io.clearLCD(22+i)
    }

    let messages = ["booting", "mimo is power", "mcorp rulz", "#10yearchallenge", "guachafita", "juakers"]

    for(let i = 0; i<6; i++){

      this.time.delayedCall(500+(~~(Math.random()*2000)), () => {    
        
        this.io.displayOnLCD(22+i, messages[i], 1)
        this.time.delayedCall(2000, () => {
          this.io.clearLCD(22+i)
        }, [], this)
      }, [], this)
    }
    
    this.io.resetButtonStates()

    for (var i = 0; i < 6; i++) {
      this.io.displayOnLCD(22+i, 'loading...', 1)
    }

    let spacingTime = 200
    let delay = 200
    this.playLightSequenceComplex([15,29,31,13,35,33], delay, spacingTime)

    let delay2 = spacingTime*5 + delay
    let sequenceB = [
      [15, delay2+spacingTime*0, spacingTime], [33, delay2+spacingTime*0, spacingTime],
      [29, delay2+spacingTime*1, spacingTime], [35, delay2+spacingTime*1, spacingTime],
      [31, delay2+spacingTime*2, spacingTime], [13, delay2+spacingTime*2, spacingTime],
      [29, delay2+spacingTime*3, spacingTime], [35, delay2+spacingTime*3, spacingTime],
      [15, delay2+spacingTime*4, spacingTime], [33, delay2+spacingTime*4, spacingTime],
      [29, delay2+spacingTime*5, spacingTime], [35, delay2+spacingTime*5, spacingTime],
      [31, delay2+spacingTime*6, spacingTime], [13, delay2+spacingTime*6, spacingTime],
      [29, delay2+spacingTime*7, spacingTime], [35, delay2+spacingTime*7, spacingTime],
      [15, delay2+spacingTime*8, spacingTime], [33, delay2+spacingTime*8, spacingTime]
    ]
    this.playLightSequence(sequenceB)    
    let delay3 = delay2+spacingTime*9

    this.playLightSequenceComplex([15,29,31,13,35,33], delay3, spacingTime)
    
    this.time.delayedCall(4200, () => {
      for (var i = 0; i < 6; i++) {
        this.io.clearLCD(22+i)
      }
    }, [], this)
    this.time.delayedCall(4400, () => {
      console.log('loading end')
      this.changeToScene(this.nextScene)
    }, [], this)
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
    console.log(sequence)
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

}