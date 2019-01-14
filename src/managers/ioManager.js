import io from 'socket.io-client';
const socket = io('http://localhost:8000');

let Inputs = {
  'A': {pressed: false},
  'B': {pressed: false},
  'C': {pressed: false},
  'D': {pressed: false},
  'E': {pressed: false},
  'F': {pressed: false},
  '0': {pressed: false},
  '1': {pressed: false},
  '2': {pressed: false},
  '3': {pressed: false},
  '4': {pressed: false},
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
      let event = this.listeners[data.action]
      if(event) event(data)
    });

    this.clearListeners()
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