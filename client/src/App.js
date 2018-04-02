import React from 'react';
import './App.css';
import Header     from './component/header';
import Subheader  from './component/subheader';
import Play       from './component/play';
import Menu       from './component/menu';
import Dashboard  from './component/dashboard';
import Market     from './component/market';
import Login      from './component/login';
import Register   from './component/register';
import Disconnect from './component/disconnect';
import Contact    from './component/contact';
import About      from './component/about';
import Admin      from './component/admin';
import RawData    from './component/rawData';
import NotFound   from './component/404';
import { HashRouter, Switch, Route } from 'react-router-dom';

const App = () => (
    <div>
        <HashRouter>
            <div>
                <Header />
                <Subheader />             
                <div  className="app-body">
                <Switch>
                    <Route exact path = "/"           component= { Menu } />
                    <Route exact path = "/play"       component= { Play } />
                    <Route exact path = "/dashboard"  component= { Dashboard } />
                    <Route exact path = "/market"     component= { Market } />
                    <Route exact path = "/login"      component= { Login } />
                    <Route exact path = "/register"   component= { Register } />
                    <Route exact path = "/disconnect" component= { Disconnect } />       
                    <Route exact path = "/contact"    component= { Contact } />
                    <Route exact path = "/about"      component= { About } />
                    <Route exact path = "/admin"      component= { Admin } />
                    <Route exact path = "/raw"        component= { RawData } />  
                    <Route path= "/*"                 component= { NotFound } />}

                </Switch>
                </div>
            </div>
        </HashRouter>
    </div>
)

export default App



