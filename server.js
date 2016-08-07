"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = new express();

app.use(bodyParser.urlencoded());

app.use(express.static(__dirname + '/public'));

app.listen(3000, () => {
    console.log('Server start');
});
