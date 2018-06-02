import { HashRouter, Switch, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import { Header, Subheader, Play, Dashboard, Menu, Market, Login, Register, Disconnect, Contact, About, Admin, RawData, Chat, Timeline, NotFound,
} from './component';

const App = () => (
  <div>
    <HashRouter>
      <div>
        <Header />
        <Subheader />
        <div className="app-body">
          <Switch>
            <Route exact path="/" component={Menu} />
            <Route exact path="/play" component={Play} />
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
            <Route exact path="/social" component={Timeline} />
            <Route path="/*" component={NotFound} />}

          </Switch>
        </div>
      </div>
    </HashRouter>
  </div>
);

export default App;

