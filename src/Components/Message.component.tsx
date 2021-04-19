import { FormEvent, useEffect, useState } from 'react';
import Api from '../Services/api';
import SocketService from '../Services/Socket';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import { Content, InputStyled, TitleStyled } from './Message.component.style';
import { Separator, ButtonStyled } from '../App.component.style';

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
    <>
        <form onSubmit={handleSend}>
          <TitleStyled> Galley Solution Exercise Test </TitleStyled>
          <Content>
          <InputStyled placeholder='String One' onChange={e => setStringOne(e.target.value)} value={stringOne} />
          <Separator/>
          <InputStyled placeholder='String Two' onChange={e => setStringTwo(e.target.value)} value={stringTwo} />
          <Separator/>
          <ButtonStyled type='submit'>Submit strings</ButtonStyled>
          </Content>
        </form>
        Author: Rennan Ribas
    </>
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
    container: position ? position : 'top-left',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 5000,
      onScreen: true
    }
  });
};

export default MessageComponent;
