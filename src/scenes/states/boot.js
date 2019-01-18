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
    this.io.resetButtonStates()
    
    this.blink(27, 500, 700)
    this.blink(33, 500, 700)
    this.blink(29, 800, 700)
    this.blink(35, 800, 700)
    this.blink(31, 1100, 700)
    this.blink(37, 1100, 700)

    this.blink(31, 2200, 700)
    this.blink(37, 2200, 700)
    this.blink(29, 2500, 700)
    this.blink(35, 2500, 700)
    this.blink(27, 2800, 700)
    this.blink(33, 2800, 700)

    this.time.delayedCall(4000, () => {
      this.changeToScene(this.nextScene)
    }, [], this)
  }

  blink(id, start, delay){
    this.time.delayedCall(start, () => {
      this.io.turnOnLight(id)
    }, [], this)
    this.time.delayedCall(start+delay, () => {
      this.io.turnOnLight(id)
    }, [], this)    
  }

}