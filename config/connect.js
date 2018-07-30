const crypto = require('crypto');

const database = 'stockprof';
const login = process.env.USER_LOGIN;
const pwd = process.env.DB_PWD;

if (!process.env.DB_PWD || !process.env.USER_LOGIN) {
  console.log('Do not forget to SET USER_LOGIN and DB_PWD !!');
} else {
  console.log(`Connect.js:  trying to log as ${process.env.USER_LOGIN}`);
}

if (!process.env.API_KEY || !process.env.API_SECRET) {
  console.log('Do not forget to SET API_SECRET and API_KEY !!');
} else {
  console.log(`[Connect-handler] Trying to log as ${process.env.USER_LOGIN}`);
}

// CEX.io websocket service
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
const timestamp = Math.floor(Date.now() / 1000);
const signature = crypto.createHmac('sha256', apiSecret).update(timestamp + apiKey).digest('hex');

export const args = {
  e: 'auth',
  auth: {
    key: apiKey,
    signature,
    timestamp,
  },
};

// MongoDB
export const uri =
    `mongodb://${
      login
    }:${
      pwd
    }@cluster0-shard-00-00-2x6ac.mongodb.net:27017,cluster0-shard-00-01-2x6ac.mongodb.net:27017,cluster0-shard-00-02-2x6ac.mongodb.net:27017/${
      database
    }?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`;

