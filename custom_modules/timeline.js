import chalk from 'chalk';
import { server } from '../api/routes';

const io = require('socket.io')(server, { wsEngine: 'ws' });
const WebSocket = require('ws');

export const ioServer = io.on('connection', (client) => {
  console.log(chalk.blue('[Socket.io] Connected'));

  client.on('chatMessage', (msg) => {
    // console.log('[Socket.io] receiving Msg: ', msg);
    arrayMsg.push(msg);
    client.emit('arrayMessage', arrayMsg);
  });

  client.on('subscribeToListUpdates', () => {
    console.log('[Socket.io] Subscribing to timer with interval 4000');
    getUsers(client);
  });


  client.on('btc-initial', () => {
    console.log('[btc-initial] says hello...');
    priceDB.get((docs) => {
      client.emit('btc', docs);
    });
  });
});

export default null;
