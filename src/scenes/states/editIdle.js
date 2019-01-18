import Scene from '../scene'

export default class EditIdleState extends Scene {
  constructor () {
    super({key: 'editIdleState'})
    this.nextScene = 'optimizeState'

    // set all the materials as not selected
    this.selectedMaterial = {
      mtlL1: {
        pressed: false,
        status: 0,
        lightID: 15,
        LCD_ID: 22,
        message: 'President Elected'
      },
      mtlL2: {
        pressed: false,
        status: 0,
        lightID: 29,
        LCD_ID: 26,
        message: 'Public Declaration'
      },
      mtlL3: {
        pressed: false,
        status: 0,
        lightID: 31,
        LCD_ID: 24,
        message: 'Judges'
      },
      mtlR1: {
        pressed: false,
        status: 0,
        lightID: 33,
        LCD_ID: 25,
        message: 'Complot'
      },
      mtlR2: {
        pressed: false,
        status: 0,
        lightID: 35,
        LCD_ID: 23,
        message: 'Boicot'
      },
      mtlR3: {
        pressed: false,
        status: 0,
        lightID: 13,
        LCD_ID: 27,
        message: 'Terrorist attack'
      }
    }
  }

  create (params) {
    super.create(params)

    // add to the scene buttons and other things that will allow player interaction
    this.createUI()
    
    this.io.printerMessage()

    // add listeners for material selection
    /*
    this.io.registerListener('BTN-A', this.handleButton)
    this.io.registerListener('BTN-B', this.handleButton)
    this.io.registerListener('BTN-C', this.handleButton)
    this.io.registerListener('BTN-D', this.handleButton)
    this.io.registerListener('BTN-E', this.handleButton)
    this.io.registerListener('BTN-F', this.handleButton)
*/
    // add the keys that will be used in the Web standalone version
    this.keys = this.input.keyboard.addKeys({
      // assign keys for material selection
      btnA: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
      btnB: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      btnC: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
      btnD: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y),
      btnE: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G),
      btnF: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V)
    })

    Object.keys(this.selectedMaterial).forEach(key => {
      let materialHW = this.selectedMaterial[key]
      this.io.displayOnLCD(materialHW.LCD_ID, materialHW.message, 1)
    })
  }

  createUI() {
    // nineslice(x, y, width, height, key, corner_slice_offset, offset_safe_area)
    let nineBtn = this.optimization = this.add.nineslice(
      this.cameras.main.width - 132, this.cameras.main.height - 68,
      128, 64,
      'nineBtn',
      18,
      2
    )
    nineBtn
      .setInteractive()
      .on('pointerdown', () => this.changeToScene(this.nextScene), this)
  }

  handleButton(data) {
    if (data.down) {
      //console.log("handle buttons ", data)
      //console.log('action received', data)
      let material =this.selectedMaterial[data.action]
      if (!material.pressed) {
        material.pressed = true
        material.status =
          (material.status + 1) & 1

        if(material.status>0) {
          this.io.turnOnLight(material.lightID)
        }else {
          this.io.turnOffLight(material.lightID)
        }
      }
    }
    else {
      //console.log(data)
      this.selectedMaterial[data.action].pressed = false
    }
  }

  buttonF(data) {
    console.log('on F pressed!!', data)
  }

  update(time, delta) {
    if(this.io.Inputs['BTN-0'].pressed){
      console.log('woooo')
    }

    // check material selection buttons that have been pressed
    let editionInput = {
      mtlL1: this.keys.btnA.isDown || this.io.Inputs['BTN-A'].pressed,
      mtlL2: this.keys.btnB.isDown || this.io.Inputs['BTN-B'].pressed,
      mtlL3: this.keys.btnC.isDown || this.io.Inputs['BTN-C'].pressed,
      mtlR1: this.keys.btnD.isDown || this.io.Inputs['BTN-D'].pressed,
      mtlR2: this.keys.btnE.isDown || this.io.Inputs['BTN-E'].pressed,
      mtlR3: this.keys.btnF.isDown || this.io.Inputs['BTN-F'].pressed
    }

    for (const key in editionInput) {
      if (editionInput.hasOwnProperty(key)) {
        this.handleButton({
          action: key,
          label: key,
          down: editionInput[key]
        })
      }
    }
  }

}