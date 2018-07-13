import { HashRouter, Switch, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import { Login, Register, Disconnect, Contact, Admin, RawData, Subheader, Header, About, NotFound, ResetPassword } from './component/common';
import { Market, Dashboard } from './component/market/';
import { UserScores } from './component/scores';
import { Timeline } from './component/timeline';
import Chat from './component/chat';
import Menu from './component/menu';


const App = () => (
  <div>
    <HashRouter>
      <div>
        <Header />
        <Subheader />
        <div className="app-body">
          <Switch>
            <Route exact path="/" component={Menu} />
            <Route exact path="/scores" component={UserScores} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/market" component={Market} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/disconnect" component={Disconnect} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/about" component={About} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/raw" component={RawData} />
            <Route exact path="/chat" component={Chat} />
            <Route exact path="/timeline" component={Timeline} />
            <Route exact path="/reset" component={ResetPassword} />
            <Route path="/*" component={NotFound} />
          </Switch>
        </div>
      </div>
    </HashRouter>
  </div>
);

export default App;

