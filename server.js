"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = new express();

app.use(bodyParser.urlencoded());

app.use(express.static(__dirname + '/public'));

let i = 2;

let lists = [{value: '123', static: true, index: 0}, {value:'456', static:true, index: 1}]

app.get('/app/todolists', (req, res) => {
    res.json(lists);
});

app.post('/app/todolist', (req, res) => {
    lists.push({value:req.body.value,static: true, index: i});
    i++;

    res.json(lists);
});

app.delete('/app/todolist', (req,res) => {
    let index;
    for(let j = 0; j < lists.length ; j++) {
        if(lists[j].index === req.body.index){
            index = j;
            break;
        }
    }

    lists.splice(index, 1);

    res.json(lists);
});

app.put('/app/todolist', (req, res) => {
    let index;
    for(let j = 0; j < lists.length ; j++) {
        if(lists[j].index === parseInt(req.body.index)){
            index = j;
            break;
        }
    }
    lists[index].static = !lists[index].static;

    res.json(lists);
})

app.listen(3000, () => {
    console.log('Server start');
});
