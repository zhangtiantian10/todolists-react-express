"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = new express();

app.use(bodyParser.urlencoded());

app.use(express.static(__dirname + '/public'));

let lists = [{value: '123', static: true}, {value:'456', static:true}]

app.get('/app/todolists', (req, res) => {
    res.json(lists);
});

app.post('/app/todolist', (req, res) => {
    lists.push(req.body.list);

    res.json(lists);
});

app.delete('/app/todolist', (req,res) => {
    lists.splice(req.body.index, 1);

    res.json(lists);
});

app.put('/app/todolist', (req, res) => {
    lists[req.body.index].static = !lists[req.body.index].static;

    res.json(lists);
})

app.listen(3000, () => {
    console.log('Server start');
});
