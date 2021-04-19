import io from 'socket.io-client';
import pushNotification from '../Utils/notifications';
class SocketService {
  socket: any;

  constructor() {
    this.init();
  }

  async init() {
    this.socket = io(process.env.REACT_APP_WS_URL || 'http://localhost:4555');
    if (this.socket) this.socket.emit('join');
  }

  async disconnectSocket() {
    if(this.socket) this.socket.disconnect();
  }

  async subscribe(toastFunction: any) {
    if (!this.socket) this.init();
    return this.socket.on('message', (msg: string) => {
      pushNotification(msg);
      console.log(msg);
      toastFunction('Received a message from WebSocket', msg, 'info', 'top-left');
    });
  }
}

export default new SocketService()