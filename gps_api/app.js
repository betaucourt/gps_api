'use strict';

/**
 * Module dependencies
 */

require('dotenv').config();

const fs = require('fs');
const join = require('path').join;
const express = require('express');
const cookieParser = require('cookie-parser');
var cors = require('cors');
//const bodyParser = require('body-parser');

const port = 3000;

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());


/**
 * Expose
 */

module.exports = {
  app,
};

// Bootstrap routes
require('./routes/index')(app);

app.listen(process.env.PORT);