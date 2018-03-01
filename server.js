


// Routes and API requests handling
import { port } from './api/routes.js';

// Database
import { db } from './custom_modules/db-handler';
db.init();

// Websockets
import { ioServer } from './custom_modules/ws-handler.js';

console.log(`[Server] Node and Socket.io : listening on port ${port}`)


