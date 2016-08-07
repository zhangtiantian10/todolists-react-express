"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = new express();

app.use(bodyParser.urlencoded());

app.use(express.static(__dirname + '/public'));

let i = 2;

let lists = [{value: '123', static: true, index: 0}, {value:'456', static:true, index: 1}]

app.get('/app/todolists', (req, res) => {
    fs.readFile('./data.json', 'utf8', function (err, data) {
        if(err){
            return;
        }

        if (data === '') {
            res.status(200).json([]);

        }
        else {
            const newData = JSON.parse(data);

            res.status(200).json(newData.lists);
        }
    });
});

app.post('/app/todolist', (req, res) => {
    fs.readFile('./data.json', 'utf8', function (err, data) {
        if(err){
            return;
        }
        let newData = {index: 0, lists: []};

        if (data != '') {
            newData = JSON.parse(data);
        }
        newData.lists.push({value:req.body.value,static: true, index: newData.index});
        newData.index ++;

        fs.writeFile('./data.json', JSON.stringify(newData), function (err) {
            return;
        });

        res.status(200).json(newData.lists);
    });
});

app.delete('/app/todolist', (req,res) => {
    fs.readFile('./data.json', 'utf8', function (err, data) {
        if(err){
            return;
        }
        let newData = {index: 0, lists: []};

        if (data != '') {
            newData = JSON.parse(data);
            for(let i = 0; i < newData.lists.length ; i++) {
                if(newData.lists[i].index === parseInt(req.body.index)){
                    newData.lists.splice(i, 1);
                    break;
                }
            }
        }
        fs.writeFile('./data.json', JSON.stringify(newData), function (err) {
            return;
        });
        res.status(200).json(newData.lists);
    });
});

app.put('/app/todolist', (req, res) => {
    fs.readFile('./data.json', 'utf8', function (err, data) {
        if(err){
            return;
        }
        let newData = {index: 0, lists: []};

        if (data != '') {
            newData = JSON.parse(data);
            console.log(req.body.index)
            for(let i = 0; i < newData.lists.length ; i++) {
                if(newData.lists[i].index === parseInt(req.body.index)){
                    newData.lists[i].static = !newData.lists[i].static;
                    break;
                }
            }
        }
        fs.writeFile('./data.json', JSON.stringify(newData), function (err) {
            return;
        });
        res.status(200).json(newData.lists);
    });
});

app.delete('/app/todolists', (req, res) => {
    fs.readFile('./data.json', 'utf8', function (err, data) {
        if(err){
            return;
        }
        let newData = {index: 0, lists: []};

        if (data != '') {
            newData = JSON.parse(data);
            const completes = newData.lists.filter(list => !list.static);

            completes.forEach(complete => {
                for(let i = 0; i < newData.lists.length; i++) {
                    if(newData.lists[i].index === complete.index) {
                        newData.lists.splice(i,1);
                    }
                }
            });
        }

        fs.writeFile('./data.json', JSON.stringify(newData), function (err) {
            return;
        });

        res.status(200).json(newData.lists);
    });
})

app.listen(3000, () => {
    console.log('Server start');
});
