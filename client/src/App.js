import React from 'react';
import './App.css';
import Header     from './component/header';
import RawData    from './container/rawData';
import Social     from './component/social';
import Btc        from './component/btc';
import Login      from './container/loginContainer';
import Register   from './container/registerContainer';
import Disconnect from './container/disconnect';
import Contact    from './component/contact';
import About      from './component/about';
import NotFound   from './component/404';
import { HashRouter, Switch, Route } from 'react-router-dom';

const App = () => (
    <div className="App">
        <HashRouter>
            <div>
                <Header />             
                <RawData />

                <Switch>
                    <Route exact path = "/"           component= { Social }/>
                    <Route exact path = "/home"       component= { Btc }/>
                    <Route exact path = "/login"      component= { Login } />
                    <Route exact path = "/register"   component= { Register }     />
                    <Route exact path = "/disconnect" component= { Disconnect }     />                    
                    <Route exact path = "/contact"    component= { Contact }     />
                    <Route exact path = "/about"      component= { About }     />
                    <Route path= "/*"                 component= { NotFound }     />}

                </Switch>
            </div>
        </HashRouter>
    </div>
)

export default App



