import io, { Socket } from 'socket.io-client';
import notifyMe from '../Utils/notifications';
let socket: Socket;
export const initiateSocket = () => {
  socket = io('http://localhost:4555');
  if (socket) socket.emit('join');
}
export const disconnectSocket = () => {
  if(socket) socket.disconnect();
}
export const subscribeToChat = (methods: () => void) => {
  if (!socket) return(true);
  return socket.on('message', msg => {
    notifyMe(msg);
    methods();
  });
}