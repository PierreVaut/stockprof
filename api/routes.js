import { cookie } from '../custom_modules/cookie-handler';
import { db } from '../custom_modules/db-handler';
import { session } from '../custom_modules/session-handler';

const express = require('express');

const app = express();
const bodyParser = require('body-parser');

export const port = process.env.PORT || 5000;
export const server = app.listen(port);

app.use(express.static('client/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/register', (req, res) => {
  const data = {
    cookie: '',
    session: {},
    account: {},
  };

  // Set or retrieve cookie
  cookie.handle(req, res, data, (data) => {
    // First create user in the DB
    /* TODO : We should check if the user is not currently connected to prevent multiple logins... */
    db.register(req, res, data, (data) => {
      // Then create/update session File
      session.register(req, res, data);
    });
  });
});

app.post('/login', (req, res) => {
  console.log('[API] Login', req.body);
  const data = {
    cookie: '',
    session: {},
    account: {},
  };

  // Set or retrieve cookie
  cookie.handle(req, res, data, (data) => {
    // Get user in the DB
    /* TODO : We should check if the user is not currently connected to prevent multiple logins... */
    db.login(req, res, data, (data) => {
      // Then create/update session
      session.register(req, res, data);
    });
  });
});

app.post('/disconnect', (req, res) => {
  const data = {
    cookie: '',
    session: {},
    account: {},
  };

  // Set or retrieve cookie
  cookie.remove(req, res, data, (data) => {
    session.disconnect(req, res, data, cb => {
      db.disconnect(req, res, data);
    });
  });
});

app.post('/market-operation', (req, res) => {
  console.log('[API] Login', req.body);
  const data = {
    cookie: '',
    session: {},
    account: {},
  };

  db.marketOperation(req, res);
});

app.post('/vote/:id', (req, res) => {
  const { id } = req.params;
  db.updateTimelineItem(id, req.body, data => {
    res.json(data);
  });
});

app.post('/follow', (req, res) => {
  db.followUser(req.body, data => res.json(data));
});

app.post('/unfollow', (req, res) => {
  db.unfollowUser(req.body, data => res.json(data));
});


app.get('/timeline', (req, res) => {
  db.getTimeline(data => {
    res.json(data);
  });
});

app.get('/api/', (req, res) => {
  const data = {
    cookie: '',
    session: {},
    account: {},
  };

  // Set or retrieve cookie
  cookie.handle(req, res, data, (data) => {
    // Set or retrieve session info
    session.handle(req, res, data, (data) => {
      // Pass session info to DB to get user info
      db.handle(req, res, data);
    });
  });
});
