const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const routes = require('./src/routes')

const app = express();

app.use(cors());
app.use(express.json());

routes(app);

app.listen(process.env.PORT, () => {
    console.log('Listening on port ' + process.env.PORT);
})

module.exports = app;