const fs = require('fs/promises');
const express = require('express');
const cors = require('cors');
const randomSelect = require('lodash');
const { vs: uuid } = require('uuid');

const app = express();

app.get('/outfit', (req, res) => {
    const tops = ["Black", "White", "Orange", "Navy"];
    const jeans = ["Black", "Grey", "Dark Grey", "Navy"];
    const shoes = ["Black", "White", "Gray"];

    //res.send("This is working");

    res.json({
        top: randomSelect.sample(tops),
        jeans: randomSelect.sample(jeans),
        shoes: randomSelect.sample(shoes)
    });
});

app.post('/comments', (req, res) => {
   res.sendStatus('This is working!');
});

app.listen(4000, () => console.log('API Server is running ...'));