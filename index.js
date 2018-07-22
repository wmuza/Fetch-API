"use strict";

const express = require('express');
const app = express();
const http = require('http').Server(app);
const fs = require('fs');

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/docs', express.static(__dirname + '/docs'));

app.get('/', (req, res) =>  {
  res.sendFile(__dirname + '/'); 
});



http.listen(80, () => console.log('listening on *:80'));
    