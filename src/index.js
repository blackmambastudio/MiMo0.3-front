import 'phaser'

// -- PLUGINS ------------------------------------------------------------------
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice'

// -- SCENES -------------------------------------------------------------------
import constants from './config/constants'
import BootScene from './scenes/ui/boot'

// STATES
import BootState from './scenes/states/boot'
import EditIdleState from './scenes/states/editIdle'
import OptimizeState from './scenes/states/optimize'
import PrintState from './scenes/states/print'
import ResultsState from './scenes/states/results'
import SelectState from './scenes/states/select'
import SendState from './scenes/states/send'
import TutorialState from './scenes/states/tutorial'

import getSceneManager from './managers/sceneManager'
import getDataManager from './managers/dataManager'

import gs from './config/gameStats'
import tunner from './utils/tunner'

window.game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'content',
  width: constants.WIDTH,
  height: constants.HEIGHT,
  parent: document.getElementById('gameContainer'),
  canvas: document.getElementById('game'),
  backgroundColor: constants.BACKGROUND_COLOR,
  pixelArt: true,
  resolution: constants.SCALE,
  plugins: {
    global: [ NineSlicePlugin.DefaultCfg ]
  },
  scene: [
    BootScene,
    BootState,
    TutorialState,
    EditIdleState,
    OptimizeState
  ]
})

// init managers
getSceneManager(window.game.scene)
getDataManager()

document.getElementById('game').focus()
window.focus()


// how it works with game context?
if(constants.DAT_GUI_ENABLE) {
  gs.setListener('game.backgroundColor', (val) => {
    let color = Phaser.Display.Color.HexStringToColor(val)
    game.renderer.config.backgroundColor = color
  })

  gs.setListener('scene.restart', (val) => {
    gs.stats.scene.restart = false
    getSceneManager().restartScene()
  })

  gs.setListener('scene.current', (val) => {
    getSceneManager().changeToScene(val)
  })
}

document.getElementById('fullScreen').onclick = () => {
  window['game']['canvas'][game.device.fullscreen.request]()
}

document.getElementById('game').oncontextmenu = function (e) {
  e.preventDefault()
}
