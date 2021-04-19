import { AppWrapperStyled, CardAppWrapper } from './App.component.style';
import './App.css';
import MessageComponent from './Components/Message.component';
import ReactNotification from 'react-notifications-component';

function App() {
  return (
    <AppWrapperStyled>
    <ReactNotification />
      <CardAppWrapper>
        <MessageComponent/>
      </CardAppWrapper>
    </AppWrapperStyled>
  );
}

export default App;
