const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log('Listening on port ' + process.env.PORT);
})