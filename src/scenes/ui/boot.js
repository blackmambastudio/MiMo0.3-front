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
      urlBase = awsPrefix
    }
    // load logo
    this.load.spritesheet('logo', urlBase + 'assets/phaserLogo.png', {
      frameWidth: 382,
      frameHeight: 331
    })

    // -- FONTS ----------------------------------------------------------------
    this.load.bitmapFont(this.fonts.BM_keney.font, urlBase + 'assets/fonts/keneyFont_0.png', urlBase + 'assets/fonts/keneyFont.fnt')
    this.load.bitmapFont(this.fonts.BM_kenneyMini.font, urlBase + 'assets/fonts/KenneyMini-8px_0.png', urlBase + 'assets/fonts/KenneyMini-8px.fnt')
    this.load.bitmapFont(this.fonts.BM_kenneyMiniSquare.font, urlBase + 'assets/fonts/KenneyMiniSquare-8px_0.png', urlBase + 'assets/fonts/KenneyMiniSquare-8px.fnt')

    // -- IMAGES ---------------------------------------------------------------
    // ---- Focus mini-game: TV control room
    this.load.image(
      'tv_control_room-background',
      'assets/sprites/tv_control_room.png'
    )
    this.load.image(
      'tv_control_room-pieceA',
      'assets/sprites/tv_control_room-pieceA-1.png'
    )
    this.load.image(
      'tv_control_room-pieceB',
      'assets/sprites/tv_control_room-pieceB-1.png'
    )
    this.load.image(
      'tv_control_room-pieceC',
      'assets/sprites/tv_control_room-pieceC-1.png'
    )
    this.load.image(
      'tv_control_room-pieceD',
      'assets/sprites/tv_control_room-pieceD-1.png'
    )
    this.load.image(
      'tv_control_room-pieceE',
      'assets/sprites/tv_control_room-pieceE-1.png'
    )

    // ---- UI
    this.load.image('nextBtn', 'assets/sprites/button_rectangleRed.png')
    this.load.image('nineBtn', 'assets/sprites/panel_boltsBlue.png')

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
