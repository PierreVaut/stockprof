// Routes and API requests handling
import { port } from './api/routes';

// Database
import { db } from './custom_modules/db-handler';
import { priceDB } from './custom_modules/price-handler';
// import { ioServer } from './custom_modules/ws-handler';

db.init();
priceDB.init();

console.log(`[Server] Node and Socket.io : listening on port ${port}`);
