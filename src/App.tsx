import { useEffect, useState } from 'react';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import './App.css';
import Api from './services/api';
import { initiateSocket, disconnectSocket,
  subscribeToChat } from './services/socket';

const App = () => {
  const [ stringOne, setStringOne ] = useState<string>("");
  const [ stringTwo, setStringTwo ] = useState<string>("");
  const rooms = ['A', 'B', 'C'];
  const [room, setRoom] = useState(rooms[0]);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const handleSend = async () => {
    await Api.post('/alert', {stringOne, stringTwo});
    console.log(stringOne + stringTwo);
  };

  useEffect(() => {
    if (room) initiateSocket(room);
    subscribeToChat();
    return () => {
      disconnectSocket();
    }
  }, [room]);

  return (
    <div className="App">
      <header className="App-header">
        <input placeholder="String one" onChange={e => setStringOne(e.target.value)}/>
        <input placeholder="String two"onChange={e => setStringTwo(e.target.value)}/>
        
        <button onClick={handleSend}>Submit strings</button>
      </header>
    </div>
  );
}

export default App;
