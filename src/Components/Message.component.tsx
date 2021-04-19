import { FormEvent, useEffect, useState } from 'react';
import Api from '../Services/api';
import SocketService from '../Services/Socket';
import ReactNotification, { ReactNotificationOptions } from 'react-notifications-component'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

const MessageComponent = () => {
  const [stringOne, setStringOne] = useState<string>('');
  const [stringTwo, setStringTwo] = useState<string>('');

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    const toastMessage = 'StringOne: ' + stringOne + ' | StringTwo: ' + stringTwo;
    await Api.post(
        '/publish', 
        { stringOne, stringTwo }
      ).then(() => {
      showToast(
        'Message sent via HTTP Post to server API!', 
        toastMessage,
        'success');
    }, (err) => { showToast(
        'Failed to sent a message.', 
        err.toString(), 
        'danger') });
  };

  useEffect(() => {
    SocketService.subscribe(showToast);
    return () => {
      SocketService.disconnectSocket();
    }
  }, []);

  return (
    <div className='App'>
      <ReactNotification />
      <header className='App-header'>
        <form onSubmit={handleSend}>
          <input placeholder='String one' onChange={e => setStringOne(e.target.value)} value={stringOne} />
          <input placeholder='String two' onChange={e => setStringTwo(e.target.value)} value={stringTwo} />
          <button type='submit'>Submit strings</button>
        </form>
      </header>
    </div>
  );
}

const showToast = (
  title: string,
  message: string,
  type: 'success' | 'danger' | 'info' | 'warning',
  position?: 'top-right' | 'top-left' | 'bottom-center' | 'top-center'
) => {
  store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: 'top',
    container: position ? position : 'top-center',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 5000,
      onScreen: true
    }
  });
};

export default MessageComponent;
