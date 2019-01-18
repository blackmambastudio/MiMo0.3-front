import io from 'socket.io-client';

//console.log(socket)
let Inputs = {
  'BTN-A': {pressed: false},
  'BTN-B': {pressed: false},
  'BTN-C': {pressed: false},
  'BTN-D': {pressed: false},
  'BTN-E': {pressed: false},
  'BTN-F': {pressed: false},
  'BTN-0': {pressed: false},
  'BTN-1': {pressed: false},
  'BTN-2': {pressed: false},
  'BTN-3': {pressed: false},
  'BTN-4': {pressed: false},
  'ACCEPT': {pressed: false},
  'REJECT': {pressed: false},
  'LEFT': {value: 0},
  'RIGHT': {value: 0},
  'ON': {pressed: 0}
}

class IOManager {
  constructor() {
    //this.socket = io('http://192.168.0.53:8000',
    this.socket = io('http://192.168.0.25:8008',
      {reconnectionAttempts: 3}
    )
    console.log(this.socket)
    this.socket.on("connect", _ => {
      console.log("connected")
      this.socket.emit('connect2pi', {
        data: 'Table UI connected.'
      });
    });

    this.socket.on('connect2pi', msg => {
      console.log('c2p connected!!!!!!!', msg);
    });

    this.socket.on('hello', msg => {
      console.log('serial connected!!!!!!!', msg);
    });

    this.socket.on('gpio', data => {
      //console.log('Read from GPIO: ' + data);
      //console.log(data);
      try{
        this.Inputs[data.action].pressed = data.status
        let event = this.listeners[data.action]
        if(event) event(data)
      }catch(exception){
        console.error(exception)
      }
      
    });

    this.socket.emit('hello', {})

    this.clearListeners()
    this.Inputs = Inputs
  }

  clearListeners(){
    this.listeners = {}
  }

  registerListener (action, callback) {
    this.listeners[action] = callback
  }

  displayOnLCD(id, message, line) {
    let secondLine = ''
    let splitted = message.split(' ')
    message = splitted[0]
    secondLine = splitted[1]

    this.socket.emit('lcd_print', {
      lcd_id: id,
      message: message.replace(/\./g, ' '),
      line: line || 1
    })
    if(secondLine) {
      this.socket.emit('lcd_print', {
        lcd_id: id,
        message: secondLine.replace(/\./g, ' '),
        line: 2
      })
    }
  }

  clearLCD(id) {
    this.socket.emit('lcd_clear', {
      lcd_id: id
    })
  }

  setLedLight(id, color) {
    this.socket.emit('rgb_led', {
      id: id, 
      r: color[0]^1,
      g: color[1]^1,
      b: color[2]^1 
    })
  }

  turnOffLedLight(id){
    setLedLight(id, [0,0,0])
  }

  turnOnLight(id){
    this.socket.emit('btn_led', {
      'btn_led_id': id,
      'btn_led_state': true
    })
  }

  turnOffLight(id){
    this.socket.emit('btn_led', {
      'btn_led_id': id,
      'btn_led_state': false
    })
  }

  printerMessage(){
    return true
    this.socket.emit('printer', {
      'user': 'MiMo Console',
      'date': 'Oct 30  1982',
      'text': ">> INCOMING EVENT <<\n\nTHE PRESIDENTIAL CANDIDATE FULANO SAYS HE WILL ALWAYS SUPPORT TELMAR AS LONG AS THAT DOESN'T JEOPARDIZE OUR RELATIONSHIP WITH HUNAGARA'S GOVERMENT."
    })
  }

  setButtonBacklight(id, status) {
    //socker.
  }

  resetButtonStates(){
    this.socket.emit('btn_reset', {})
  }
}

let ioManager

let getIOManager = () => {
  if (!ioManager) {
    ioManager = new IOManager()
  }
  return ioManager
}

export default getIOManager