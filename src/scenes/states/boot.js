import Scene from '../scene'

export default class BootState extends Scene {
  constructor () {
    super({key: 'bootState'})
    // this.nextScene = 'tutorialState' // use this when not developing
    this.nextScene = 'optimizeState'
  }

  create (params) {
    super.create(params)
    /*
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
    
    var interval = 50
    for (var i = 0; i < 10; i++) {
      var delay = i*7*interval
      this.time.delayedCall(interval + delay, () => {
        this.io.setLedLight('0', [1, 0, 0])
      }, [], this)
        
      this.time.delayedCall(interval*2 + delay, () => {
        this.io.setLedLight('0', [0, 1, 0])
      }, [], this)
      this.time.delayedCall(interval*3 + delay, () => {
        this.io.setLedLight('0', [0, 1, 1])
      }, [], this)
      this.time.delayedCall(interval*4 + delay, () => {
        this.io.setLedLight('0', [0, 0, 1])
      }, [], this)
      this.time.delayedCall(interval*5 + delay, () => {
        this.io.setLedLight('0', [1, 0, 1])
      }, [], this)
      this.time.delayedCall(interval*6 + delay, () => {
        this.io.setLedLight('0', [1, 1, 0])
      }, [], this)
      this.time.delayedCall(interval*7 + delay, () => {
        this.io.setLedLight('0', [1, 1, 1])
      }, [], this)
    }
  */
    this.time.delayedCall(1000, () => {
      this.changeToScene(this.nextScene)
    }, [], this)
  }

}