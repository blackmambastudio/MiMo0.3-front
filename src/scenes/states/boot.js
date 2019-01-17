import Scene from '../scene'

export default class BootState extends Scene {
  constructor () {
    super({key: 'bootState'})
    // this.nextScene = 'tutorialState' // use this when not developing
    this.nextScene = 'optimizeState'
  }

  create (params) {
    super.create(params)
    for (var i = 0; i < 6; i++) {
      this.io.clearLCD(22+i)
    }

    let messages = ["booting", "mimo is power", "mcorp rulz", "#10yearchallenge", "guachafita", "juakers"]

    for(var i = 0; i<10; i++){

      this.time.delayedCall(500+(~~(Math.random()*2000)), () => {    
        let index = ~~(Math.random()*6)
        this.io.displayOnLCD(22+index, messages[index], 1)
        this.time.delayedCall(2000, () => {
          this.io.clearLCD(22+index)
        }, [], this)
      }, [], this)
    }

    this.time.delayedCall(5000, () => {
      this.changeToScene(this.nextScene)
    }, [], this)
  }

}