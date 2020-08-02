const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const app = express();
const config = require('../config/general');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(routes);

app.listen(config.app.PORT, (err) => {
  console.log(config);
  if (err) {
    console.error(err);
    return process.exit(1);
  }
  console.log(`listening on port: ${config.app.PORT}`);
});
