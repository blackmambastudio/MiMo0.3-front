import io from 'socket.io-client';
const socket = io('http://localhost:8000',
  {reconnectionAttempts: 3}
)
console.log(socket)
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
    socket.on( 'connect', () => {
      socket.emit('connect2pi', {
        data: 'Table UI connected.'
      });
    });

    socket.on('connect2pi', msg => {
      console.log(msg);
    });

    socket.on('gpio', data => {
      //console.log('Read from GPIO: ' + data.action);
      this.Inputs[data.action].pressed = data.status=='1'
      let event = this.listeners[data.action]
      if(event) event(data)
    });

    this.clearListeners()
    this.Inputs = Inputs
  }

  clearListeners(){
    this.listeners = {}
  }

  registerListener (action, callback) {
    this.listeners[action] = callback
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