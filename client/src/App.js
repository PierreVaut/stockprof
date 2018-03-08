import React from 'react';
import './App.css';
import Header     from './component/header';


import Play       from './component/play';
import Menu       from './container/menu';
import Dashboard  from './component/dashboard';

import Btc        from './component/btc';
import Login      from './container/login';
import Register   from './container/register';
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

                <Switch>
                    <Route exact path = "/"           component= { Play }/>
                    <Route exact path = "/menu"       component= { Menu }/>
                    <Route exact path = "/dashboard"  component= { Dashboard }/>
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



