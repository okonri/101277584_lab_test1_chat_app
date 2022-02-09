const express = require('express');
const privateMessageModel = require('./PrivateMessage');
const app = express();


//Create privateMessage

app.post('/privateMessage', async (req, res) => {

    console.log(req.body)
    const privateMessage = new privateMessageModel(req.body);
    try {
        await privateMessage.save((err) => {
            if (err) {

                res.send(err)
            } else {
                res.send(privateMessage);
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
});



//Get privateMessage
app.get('/privateMessage', async (req, res) => {
    const privateMessage = await privateMessageModel.find({});

    try {
        console.log(privateMessage[0].name)
        res.status(200).send(privateMessage);
    } catch (err) {
        res.status(500).send(err);
    }
});



module.exports = app