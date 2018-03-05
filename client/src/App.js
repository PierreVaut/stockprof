import React from 'react';
import './App.css';
import Header     from './component/header';
import RawData    from './container/rawData';
import Login      from './container/login';
import Register   from './container/register';
import Disconnect from './container/disconnect';
import Ws         from './component/ws';
import Btc        from './component/btc';

const App = () => (
    <div className="App">
        <Header />             
        <RawData />
        <Login />
        <Register />
        <Disconnect />
        <Ws />
        <Btc />
    </div>
)

export default App



