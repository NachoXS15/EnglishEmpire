const express = require('express');
const { auth } = require('firebase-admin');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const app = express();
const SECRET_KEY = process.env.SECRET_KEY;

app.post('/auth', async(req, res) => {
    const idToken = req.body.token;

    try {
        const decodedToken = await auth().verifyIdToken(idToken);
        const userId = decodedToken.uid;
        const jwtToken = jwt.sign({userId}, SECRET_KEY, {expiresIn: '30m'})
        res.json({
            jwt: jwtToken
        })
    } catch (error) {
        res.status(401).send('Token Invalido')
    }
})

app.listen(3000, () => {
    console.log('server at port 3000');
})