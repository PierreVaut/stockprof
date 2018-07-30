import { HashRouter, Switch, Route } from 'react-router-dom';
import React from 'react';
import './asset/css/App.css';
import './asset/css/Market.css';
import './asset/css/button.css';

import { Login, Register, Disconnect, Contact, Admin, Subheader, Header, About, NotFound, ResetPassword } from './component/common';
import { Market, Dashboard } from './component/market/';
import { UserTable } from './component/userlist';
import { Timeline } from './component/timeline';
import { Chat } from './component/chat/';
import Menu from './component/menu';
import { Notifications } from './component/notifications';


const App = () => (
  <div>
    <HashRouter>
      <div>
        <Header />
        <Subheader />
        <div className="app-body">
          <Switch>
            <Route exact path="/" component={Menu} />
            <Route exact path="/userlist" component={UserTable} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/market" component={Market} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/disconnect" component={Disconnect} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/about" component={About} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/chat/:id" component={Chat} />
            <Route exact path="/timeline" component={Timeline} />
            <Route exact path="/notifications" component={Notifications} />
            <Route exact path="/reset" component={ResetPassword} />
            <Route path="/*" component={NotFound} />
          </Switch>
        </div>
      </div>
    </HashRouter>
  </div>
);

export default App;

