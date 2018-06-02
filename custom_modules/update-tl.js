import { server } from '../api/routes';
import { db } from './db-handler';

const io = require('socket.io')(server);

export const updateTimeline = () => {
  console.log('kikou');
  db.getTimeline(result => {
    console.log('kikou4454');
    io.emit('timeline', result);
  });
};

