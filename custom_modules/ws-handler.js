import { setTimeout } from 'timers';
import { args } from '../config/connect';
import { server } from '../api/routes';
import { priceDB } from './price-handler';
import { db } from './db-handler';

const chalk = require('chalk');
const io = require('socket.io')(server, { wsEngine: 'ws' });
const WebSocket = require('ws');

const cexioWS = client => {
  // Connect to CEX.io ws-APi
  const cexWS = new WebSocket('wss://ws.cex.io/ws/', { perMessageDeflate: false });
  console.log('[cexioWS] - starting');
  cexWS.on('open', () => {
    console.log(chalk.green('[cexioWS] - open'));

    cexWS.on('message', (el) => {
      //  //console.log('[CEX server] message:', el);
      const msg = JSON.parse(el);

      if (client) {
        // Gets all prices from Database
        // priceDB.get(function(docs){client.emit('btc', docs)} )
      } else {
        (
          console.log(chalk.red('[CEX server] WS client error'))
        );
      }
      if (msg.e === 'ping') {
        // //console.log('[CEX client] Connection active')
        cexWS.send(JSON.stringify({ e: 'pong' }));
      }

      if (client && msg.data) {
        if (msg.data.symbol1) {
          // We consider only price in USD
          if (msg.data.symbol2 === 'USD') {
            // Update price in the Database and emit new price via WS
            priceDB.handle(msg.data, (docs) => {
              // console.log(chalk.green('[WS-handler] Emitting Prices...'))
              io.emit('btc', docs);
            });
          } else {
            // Prices updates in other currencies
            // //console.log('[CEX server] BTC', JSON.stringify(msg.data) );
          }
        }
      }
    });


    cexWS.on('open', el => console.log('[CEX.io] open: ', el));
    cexWS.on('error', el => console.log('[CEX.io] error: ', el));
    cexWS.on('close', el => console.log('[CEX.io] close: ', el));
    cexWS.send(JSON.stringify(args));

    cexWS.send(JSON.stringify({
      e: 'subscribe',
      rooms: ['tickers'],
    }));
  });
};


const getUsers = client => {
  db.getUsers(list => {
    client.emit('userList', list);
    // console.log(chalk.blue('[WS-handler] Emitting UserList...'));
    setTimeout(() => {
      getUsers(client);
    }, 4000);
  });
};


export const ioServer = io.on('connection', (client) => {
  client.on('chatMessage', data => {
    console.log(chalk.blue(`New Channel (emitter) - ${JSON.stringify(data.emitterId)} `));

    db.getChatHistory(data.emitterId, data.targetId, result => {
      const newObj = { history: result };
      client.emit(data.emitterId, newObj);
    });

    client.on(data.emitterId, msg => {
      db.addChatHistory(msg, () => io.emit(data.emitterId, msg));
      io.emit(data.targetId, { item: msg });
      db.getAccount(data.targetId, account => {
        const notif = {
          status: 'new',
          authorId: data.targetId,
          authorName: account.name,
          content: 'vous a envoyé un message',
          timestamp: Date.now(),
          notif_type: 'msg',
        };
        db.addNotification(data.targetId, notif);
      });
    });
  });

  client.on('subscribeToListUpdates', () => {
    console.log('[Socket.io] Client is subscribing to timer with interval 4000');
    getUsers(client);
  });

  client.on('btc-initial', () => {
    console.log('[btc-initial] says hello...');
    priceDB.get((docs) => { io.emit('btc', docs); });
  });

  /*   client.on('notification', data => {
    console.log(chalk.green('[Notifications] - open', data));
    // client.emit(id, `salut yy ${id} !`);
  }); */

  cexioWS(client);
});

