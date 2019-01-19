import Scene from '../scene'

//const env = 'PRODUCTION'
const env = 'DEV'

export default class BootScene extends Scene {
  constructor() {
    super({ key: 'bootScene' })

    this.nextScene = this.constants.AFTER_BOOT_SCENE
  }

  preload() {
    super.preload()

    let progressBox = this.add.graphics()
    let progressBar = this.add.graphics()

    let width = this.cameras.main.width
    let height = this.cameras.main.height
    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 30,
      text: 'Loading...',
      style: {
        font: '30px monospace',
        fill: '#ffffff'
      }
    })
    loadingText.setOrigin(0.5, 0.5)

    let percentText = this.make.text({
      x: width / 2,
      y: height / 2 + 25,
      text: '0%',
      style: {
        font: '20px monospace',
        fill: '#999999'
      }
    })
    percentText.setOrigin(0.5, 0.5)

    let assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 65,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    })
    assetText.setOrigin(0.5, 0.5)

    progressBox.fillStyle(0x666666, 1)
    progressBox.fillRect(width / 2 - 160, height / 2, 320, 50)

    this.load.on('progress', value => {
      progressBar.clear()
      progressBar.fillStyle(0x333333, 1)
      progressBar.fillRect(
        width / 2 + 10 - 160,
        height / 2 + 10,
        300 * value,
        30
      )
      percentText.setText(parseInt(value * 100) + '%')
    })

    this.load.on('fileprogress', file => {
      assetText.setText(file.key + ' ready')
    })

    this.load.on('complete', () => {
      progressBar.destroy()
      progressBox.destroy()
      loadingText.destroy()
      percentText.destroy()
      assetText.destroy()

      this.changeToScene(this.nextScene)
    })

    // load files
    let urlBase = ''
    if (env == 'PRODUCTION') {
      urlBase = '/static/'
    }
    // load logo
    this.load.spritesheet('logo', urlBase + 'assets/phaserLogo.png', {
      frameWidth: 382,
      frameHeight: 331
    })

    // ╔ LOAD AUDIO ═══════════════════════════════════════════════════════════╗
    
    // loading scene

    this.load.audio (
      'SFX_MimoLogo',
      urlBase + 'assets/audio/SFX/MimoLogo.ogg'
    )

    // tutorial scene

    this.load.audio (
      'SFX_Tut_Print',
      urlBase + 'assets/audio/SFX/SFX_Tut_Print.ogg'
    )

    this.load.audio (
      'SFX_Tut_Mat',
      urlBase + 'assets/audio/SFX/SFX_Tut_Mat.ogg'
    )

    this.load.audio (
      'SFX_Tut_Opt',
      urlBase + 'assets/audio/SFX/SFX_Tut_Opt.ogg'
    )

    this.load.audio (
      'SFX_Tut_St',
      urlBase + 'assets/audio/SFX/SFX_Tut_St.ogg'
    )

    this.load.audio (
      'SFX_Tut_End',
      urlBase + 'assets/audio/SFX/SFX_Tut_End.ogg'
    )

    // focus game
    this.load.audio(
      'SFX_BasicLoop',
      urlBase + 'assets/audio/SFX/Focus/SFX_BasicLoop.ogg'
    )
    this.load.audio(
      'SFX_A',
      urlBase + 'assets/audio/SFX/Focus/SFX_A.ogg'
    )
    this.load.audio(
      'SFX_B',
      urlBase + 'assets/audio/SFX/Focus/SFX_B.ogg'
    )
    this.load.audio(
      'SFX_C',
      urlBase + 'assets/audio/SFX/Focus/SFX_C.ogg'
    )
    this.load.audio(
      'SFX_D',
      urlBase + 'assets/audio/SFX/Focus/SFX_D.ogg'
    )
    this.load.audio(
      'SFX_E',
      urlBase + 'assets/audio/SFX/Focus/SFX_E.ogg'
    )
    this.load.audio(
      'UI_Pos_01',
      urlBase + 'assets/audio/SFX/Focus/UI_Pos_01.ogg'
    )
    this.load.audio(
      'UI_Pos_02',
      urlBase + 'assets/audio/SFX/Focus/UI_Pos_02.ogg'
    )
    this.load.audio(
      'UI_Pos_03',
      urlBase + 'assets/audio/SFX/Focus/UI_Pos_03.ogg'
    )
    this.load.audio(
      'UI_Pos_04',
      urlBase + 'assets/audio/SFX/Focus/UI_Pos_04.ogg'
    )
    this.load.audio(
      'UI_Pos_05',
      urlBase + 'assets/audio/SFX/Focus/UI_Pos_05.ogg'
    )
    this.load.audio(
      'UI_Turn',
      urlBase + 'assets/audio/SFX/Focus/UI_Turn.ogg'
    )

    // load materials

    // -- FONTS ----------------------------------------------------------------
    this.load.bitmapFont(this.fonts.BM_keney.font, urlBase + 'assets/fonts/keneyFont_0.png', urlBase + 'assets/fonts/keneyFont.fnt')
    this.load.bitmapFont(this.fonts.BM_kenneyMini.font, urlBase + 'assets/fonts/KenneyMini-8px_0.png', urlBase + 'assets/fonts/KenneyMini-8px.fnt')
    this.load.bitmapFont(this.fonts.BM_kenneyMiniSquare.font, urlBase + 'assets/fonts/KenneyMiniSquare-8px_0.png', urlBase + 'assets/fonts/KenneyMiniSquare-8px.fnt')

    // -- IMAGES ---------------------------------------------------------------
    // ---- Boot
    this.load.image('logo_MCorp', urlBase + 'assets/sprites/logo_MCorp.png')

    // ---- Tutorial
    this.load.image('mimo_blueprint', urlBase + 'assets/sprites/mimo_blueprint.png')
    this.load.image('mtlL1',  urlBase +'assets/sprites/mtlL1.png')
    this.load.image('mtlL2',  urlBase +'assets/sprites/mtlL2.png')
    this.load.image('mtlL3',  urlBase +'assets/sprites/mtlL3.png')
    this.load.image('mtlR1',  urlBase +'assets/sprites/mtlR1.png')
    this.load.image('mtlR2',  urlBase +'assets/sprites/mtlR2.png')
    this.load.image('mtlR3',  urlBase +'assets/sprites/mtlR3.png')
    this.load.image('opt_knobs', urlBase + 'assets/sprites/opt_knobs.png')
    this.load.image('opt_buttons', urlBase + 'assets/sprites/opt_buttons.png')
    this.load.image('printer-01', urlBase + 'assets/sprites/printer-01.png')
    this.load.image('printer-02', urlBase + 'assets/sprites/printer-02.png')
    this.load.image('printer-03', urlBase + 'assets/sprites/printer-03.png')

    // ---- Focus mini-game: TV control room
    this.load.image(
      'tv_control_room-background',
      urlBase +'assets/sprites/tv_control_room.png'
    )
    this.load.image(
      'tv_control_room-pieceA',
      urlBase +'assets/sprites/tv_control_room-pieceA-1.png'
    )
    this.load.image(
      'tv_control_room-pieceB',
      urlBase +'assets/sprites/tv_control_room-pieceB-1.png'
    )
    this.load.image(
      'tv_control_room-pieceC',
      urlBase +'assets/sprites/tv_control_room-pieceC-1.png'
    )
    this.load.image(
      'tv_control_room-pieceD',
      urlBase +'assets/sprites/tv_control_room-pieceD-1.png'
    )
    this.load.image(
      'tv_control_room-pieceE',
      urlBase +'assets/sprites/tv_control_room-pieceE-1.png'
    )

    // ---- UI
    this.load.image('nextBtn', urlBase +'assets/sprites/button_rectangleRed.png')
    this.load.image('nineBtn', urlBase +'assets/sprites/panel_boltsBlue.png')


    // -- material
    let materials = ['mp_countryOppressive', 'mp_factoryAbandoned', 'mp_familyHappy', 'mp_womenWorking']
    for (var i = 0; i < materials.length; i++) {
      let material = materials[i]
      this.load.image(
        material,
        urlBase +'assets/material/'+material+'.png'
      )
      this.load.audio(
        material+'_SFX',
        urlBase + 'assets/audio/SFX/Material/'+material+'_SFX.ogg'
      )
    }

    // -- FAKE LOADER ----------------------------------------------------------
    if (this.constants.FAKE_LOADER_ACTIVE) {
      for (var i = 0; i < 500; i++) {
        this.load.spritesheet(`logo-${i}`, urlBase + 'assets/phaserLogo.png', {
          frameWidth: 382,
          frameHeight: 331
        })
      }
    }
  }
}
