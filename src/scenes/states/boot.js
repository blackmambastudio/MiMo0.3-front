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
//    this.io.resetButtonStates()

    for (var i = 0; i < 6; i++) {
      this.io.displayOnLCD(22+i, 'loading...', 1)
    }

    for (var i = 0; i < 4; i++) {
      let delay = 1200*i + 500
      this.blink(15, delay, 300)
      this.blink(33, delay, 300)
      this.blink(29, delay+100, 300)
      this.blink(35, delay+100, 300)
      this.blink(31, delay+200, 300)
      this.blink(13, delay+200, 300)

      this.blink(31, delay+600, 300)
      this.blink(13, delay+600, 300)
      this.blink(29, delay+700, 300)
      this.blink(35, delay+700, 300)
      this.blink(15, delay+800, 300)
      this.blink(33, delay+800, 300)
    }

    //this.io.turnOffLight(35)
    //this.io.turnOnLight(37)
    this.time.delayedCall(4000, () => {
      for (var i = 0; i < 6; i++) {
        this.io.clearLCD(22+i)
      }
    }, [], this)
    this.time.delayedCall(4500, () => {
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

}