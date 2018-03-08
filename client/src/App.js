import React from 'react';
import './App.css';
import Header     from './component/header';
import RawData    from './container/rawData';
import LoginContainer      from './container/loginContainer';
import RegisterContainer   from './container/registerContainer';
import DisconnectContainer from './container/disconnectContainer';
import Ws         from './component/ws';
import Btc        from './component/btc';
import NotFound        from './component/404';
import { HashRouter, Link, NavLink, Switch, Route } from 'react-router-dom';

const App = () => (
    <div className="App">
        <HashRouter>
            <div>
                <Header />             
                <RawData />

                <Switch>
                    <Route exact path = "/"          component= { Btc }/>
                    <Route exact path = "/home"      component= { Ws }/>
                    <Route exact path = "/login"     component= { LoginContainer } />
                    <Route exact path = "/register"  component= { RegisterContainer }     />
                    <Route path= "/*"                component= { NotFound }     />}

                </Switch>
            </div>
        </HashRouter>
    </div>
)

export default App



