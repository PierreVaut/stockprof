const express = require('express');

const app = express();
const port = 5000;

app.use(express.static('client/build'));

app.get('/api/', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));