import { FormEvent, useEffect, useState } from 'react';
import Api from '../Services/api';
import { initiateSocket, disconnectSocket, subscribeToChat } from '../Services/socket';
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

const showToast = (message: string, position?: "top-right" | "top-left" | "bottom-center") => {
  store.addNotification({
    title: "Wonderful!",
    message: message,
    type: "info",
    insert: "top",
    container: position ? position : "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true
    }
  });
};
 
const MessageComponent = () => {
  const [ stringOne, setStringOne ] = useState<string>("");
  const [ stringTwo, setStringTwo ] = useState<string>("");

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    await Api.post('/alert', {stringOne, stringTwo}).then(response => {
      showToast("Message sent via HTTP Post to server API!");
    });
  };

  useEffect(() => {
    initiateSocket();
    subscribeToChat(() => showToast("Message received from WebSocket!","bottom-center"));
    return () => {
      disconnectSocket();
    }
  }, []);

  return (
    <div className="App">
      <ReactNotification/>
      <header className="App-header">
        <form onSubmit={handleSend}>
          <input placeholder="String one" onChange={e => setStringOne(e.target.value)} value={stringOne}/>
          <input placeholder="String two"onChange={e => setStringTwo(e.target.value)} value={stringTwo}/>
          <button type="submit">Submit strings</button>
        </form>
      </header>
    </div>
  );
}

export default MessageComponent;
