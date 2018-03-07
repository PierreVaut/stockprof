import React from 'react';
import './App.css';
import Header     from './component/header';
import RawData    from './container/rawData';
import LoginContainer      from './container/loginContainer';
import RegisterContainer   from './container/registerContainer';
import DisconnectContainer from './container/disconnectContainer';
import Ws         from './component/ws';
import Btc        from './component/btc';

const App = () => (
    <div className="App">
        <Header />             
        <RawData />
        <LoginContainer />
        <RegisterContainer />
        <DisconnectContainer />
        <Ws />
        <Btc />
    </div>
)

export default App



