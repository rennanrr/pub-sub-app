import io, { Socket } from 'socket.io-client';
let socket: Socket;
export const initiateSocket = (room: string) => {
  socket = io('ws://localhost:4555');
  console.log(`Connecting socket...`);
  if (socket && room) socket.emit('join', room);
}
export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}
export const subscribeToChat = () => {
  if (!socket) return(true);
  return socket.on('chat', msg => {
    console.log('Websocket event received!');
    console.log(msg);
  });
}
export const sendMessage = (room: string, message: string) => {
  if (socket) socket.emit('chat', { message, room });
}