import { uri } from '../config/connect';
import { accountSchema, timelineSchema } from '../model';
import { server } from '../api/routes';
import { updateTimeline } from './update-tl';

const chalk = require('chalk');
const mongoose = require('mongoose');

mongoose.connect(uri);
const database = mongoose.connection;


export const db = {

  init() {
    const Account = mongoose.model('Account', accountSchema);
    database.on('error', console.error.bind(console, 'connection error:'));
    database.once('open', () => {
      console.log("[accountDB-init] we're connected !");
    });
  },

  // return user Account info from DB
  // or error if the user is undefined
  handle(req, res, data, cb) {
    const Account = mongoose.model('Account', accountSchema);
    console.log('[accountDB-handler] Starting: ', data);
    if (data.session.isLogged) {
      Account.findOne({ _id: data.session._id }, (err, result) => {
        if (err) {
          data.account = `[accountDB-handler] DB error${err}`;
          console.log(data.account);
          res.json(data);
        }


        if (result !== null) {
          data.account = result;
          console.log('[accountDB-handler] ok', result);
          console.log('[accountDB-handler] Return', data);
          if (cb) {
            console.log('[accountDB-handler] Passing CB on:', data);
            cb(data);
          } else {
            res.json(data);
          }
        }
      });
    } else {
      data.account = '[accountDB-handler] User not logged or Error';
      console.log(data.account);
      console.log('[accountDB-handler] Return', data);
      if (cb) {
        console.log('[accountDB-handler] Passing CB on:', data);
        cb(data);
      } else {
        res.json(data);
      }
    }
  },

  register(req, res, data, cb) {
    const Account = mongoose.model('Account', accountSchema);
    console.log('[accountDB-register] Request:', req.body);

    // Check the request #1
    if (!req || req === '') {
      data.account = 'Error: request is undefined';
      data.error = data.account;
      console.error(`[accountDB-register] ${data.account}`);
      res.json(data);
    }

    // Check the request #2
    if (req.body.name === '' || req.body.email === '' || req.body.password === '' || !req.body.name || !req.body.email || !req.body.password
    ) {
      data.account = 'Error : Please fill in all fields';
      console.error(`[accountDB-register]${data.account}`);
      data.error = data.account;
      res.json(data);
    } else {
      Account.findOne({ email: req.body.email }, (error, result) => {
        if (error) {
          data.account = `[accountDB-register] Error fetching DB: ${error}`;
          console.error(data.account);
          data.error = data.account;
          res.json(data);
        }

        if (result) {
          data.account = 'Email already used';
          data.error = data.account;
          console.error(`[accountDB-register] Error:  ${data.account}`);
          res.json(data);
        } else {
          const newAccount = new Account();
          newAccount.isLogged = true;
          newAccount.lastLogin = Date();
          newAccount.name = req.body.name;
          newAccount.email = req.body.email;
          newAccount.password = req.body.password;
          data.account = newAccount;
          data.status = '';
          data.error = false;
          newAccount.save(() => {
            console.log('[accountDB-register] New account saved', newAccount);
            if (cb) {
              console.log('[accountDB-register] Passing CB on:', data);
              cb(data);
            } else {
              res.json(data);
            }
          });
        }
      });
    }
  },

  login(req, res, data, cb) {
    console.log('[accountDB-login] starting', data, ' - Request: ', req.body);
    const Account = mongoose.model('Account', accountSchema);

    // Check the request #1
    if (!req || req === '') {
      data.account = 'Error: request is undefined';
      data.error = data.account;
      console.error('[accountDB-login]', data.account);
      res.json(data);
    }

    // Check the request #2
    else if (req.body.name === '' || req.body.email === '' || req.body.password === ''
    ) {
      data.account = 'Error : Please fill in all fields';
      data.error = data.account;
      console.error('[accountDB-login]', data.account);
      res.json(data);
    } else {
      Account.findOne({ email: req.body.email, password: req.body.password }, (error, result) => {
        console.log('[accountDB-login] Checking DB');
        if (error) {
          data.account = `Error fetching DB: ${error}`;
          data.error = data.account;
          console.error('[accountDB-login] ', data.account);
          res.json(data);
        }

        if (result) {
          console.log('[accountDB-login] Result:', result);
          result.isLogged = true;
          result.lastLogin = Date();
          result.save();
          data.account = result;
          data.error = false;
          data.status = '';
          if (cb) {
            console.log('[accountDB-login] Passing CB on: ', data);
            cb(data);
          } else {
            res.json(data);
          }
        } else {
          data.account = 'Invalid login/pwd... ';
          data.error = data.account;
          console.error('[accountDB-login] ', data.account);
          res.json(data);
        }
      });
    }
  },

  disconnect(req, res, data, cb) {
    const Account = mongoose.model('Account', accountSchema);
    Account.findOne({ _id: data.session._id }, (err, result) => {
      if (err) {
        data.account = `[accountDB-disconnect] DB error${err}`;
        console.log(data.account);
        res.json(data);
      } else if (result !== null) {
        result.isLogged = false;
        result.save();
        data.account = result;
        data.error = false;
        data.status = '';
        console.log('[accountDB-disconnect] OK', data);


        if (cb) {
          cb(data);
        } else {
          res.json(data);
        }
      } else if (cb) {
        cb(data);
      } else {
        res.json(data);
      }
    });
  },

  // called by ws-handler.js
  getUsers(cb) {
    const Account = mongoose.model('Account', accountSchema);
    Account.find().lean().exec((err, list) => {
      if (err) { return err; }
      return cb(list);
    });
  },

  insertTimeline(item) {
    const Timeline = mongoose.model('Timeline', timelineSchema);
    const newItem = new Timeline(item);
    newItem.save(err => {
      if (err) { console.log('[Timeline error]', err); }
    });
    updateTimeline();
  },

  getTimeline(cb) {
    const Timeline = mongoose.model('Timeline', timelineSchema);
    Timeline.find().sort({ timestamp: 'desc' }).lean().exec((err, result) => {
      if (err) { return err; }
      return cb(result);
    });
  },

  getTimelineItem(id, payload, cb) {
    const _id = id;
    const Timeline = mongoose.model('Timeline', timelineSchema);
    Timeline.findOne({ _id }, (err, item) => {
      if (err) {
        console.log(chalk.red('[Error] 58v6ing TimelineItem ', _id));
        return err;
      }
      const { upvote, downvote } = payload;
      if (upvote) {
        item.upvote = upvote;
      }
      if (downvote) {
        item.downvote = downvote;
      }
      item.save();
      return cb(item);
    });
  },

  marketOperation(req, res) {
    const response = {};
    if (!req || req === '') {
      response.error = 'Error: request is undefined';
      console.error('[accountDB-marketOperation] ', response.error);
      res.json(response);
    }

    if (req.body.operation !== 'buy' && req.body.operation !== 'sell') {
      response.error = 'Error: invalid operation';
      console.error('[accountDB-marketOperation] ', response.error);
      res.json(response);
    } else {
      response.error = false;
      const Account = mongoose.model('Account', accountSchema);

      Account.findOne({ _id: req.body._id }, (error, result) => {
        if (error) {
          response.error = 'Error fetching DB, try again later...';
          console.error('[DB-marketOperation]', response.error);
          res.json(response);
        }

        if (result) {
          if (result.position === undefined) {
            result.position = {};
            console.log('[DB-marketOperation] Resetting position:', result.position);
          }
          if (result.position[req.body.symbol] === undefined) {
            result.position[req.body.symbol] = 0;
          }
          if (req.body.operation === 'buy') {
            result.position[req.body.symbol] += req.body.qty;
          } else {
            result.position[req.body.symbol] -= req.body.qty;
          }
          result.cashAvailable = Math.round(result.cashAvailable + req.body.amount);
          result.markModified('position');
          result.save();

          console.log({ result });
          const timelineItem = {
            content: `${req.body.operation === 'buy' ? 'bought' : 'sold'}  ${req.body.qty} ${req.body.symbol} for
            ${Math.round(Math.abs(req.body.amount))} $
            `,
            author: result.name,
            authorEmail: result.email,
            authorId: result._id,
          };
          this.insertTimeline(timelineItem);


          response.error = false;
          response.account = result;
          res.json(response);
        } else {
          response.error = '[DB-marketOperation] Invalid user... ';
          console.error(response.error);
          res.json(response);
        }
      });
    }
  },


};
