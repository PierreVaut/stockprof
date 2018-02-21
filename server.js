const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//app.use(express.static(__dirname));
app.use(express.static('client/build'));
//app.use(cors({ origin: 'null', credentials: true }));


app.get('/api/', (req, res) => {
    let response = { express: 'Hello From Express' };
    console.log('/api response:', response)
  res.json( response );
});

app.listen(port, () => console.log(`Listening on port ${port}`));