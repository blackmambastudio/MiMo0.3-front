import Scene from '../scene'

export default class EditIdleState extends Scene {
  constructor () {
    super({key: 'editIdleState'})
    this.nextScene = 'optimizeState'

    // set all the materials as not selected
    this.selectedMaterial = {
      mtlL1: {
        pressed: false,
        status: 0
      },
      mtlL2: {
        pressed: false,
        status: 0
      },
      mtlL3: {
        pressed: false,
        status: 0
      },
      mtlR1: {
        pressed: false,
        status: 0
      },
      mtlR2: {
        pressed: false,
        status: 0
      },
      mtlR3: {
        pressed: false,
        status: 0
      }
    }
  }

  create (params) {
    super.create(params)

    // add to the scene buttons and other things that will allow player interaction
    this.createUI()

    // add listeners for material selection
    this.io.registerListener('BTN-A', this.handleButton)
    this.io.registerListener('BTN-B', this.handleButton)
    this.io.registerListener('BTN-C', this.handleButton)
    this.io.registerListener('BTN-D', this.handleButton)
    this.io.registerListener('BTN-E', this.handleButton)
    this.io.registerListener('BTN-F', this.handleButton)

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
    // console.log('action received', data)

    if (data.down) {
      if (!this.selectedMaterial[data.action].pressed) {
        this.selectedMaterial[data.action].pressed = true
        this.selectedMaterial[data.action].status =
          (this.selectedMaterial[data.action].status + 1) & 1

        console.log(
          'selected %s material, turn light %s',
          data.label,
          (this.selectedMaterial[data.action].status > 0) ? 'ON' : 'OFF'
        )
      }
    }
    else {
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