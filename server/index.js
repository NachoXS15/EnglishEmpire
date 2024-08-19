require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const SECRET_KEY = process.env.SECRET_KEY;
const admin = require("firebase-admin");

const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
});


const app = express();

app.use(cors({
    origin: '*',
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/auth', async(req, res) => {
    const idToken = req.body.token;
    console.log('Token: ', idToken);
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const userId = decodedToken.uid
        const jwtToken = jwt.sign({userId}, SECRET_KEY, {expiresIn: '2d'})
        res.json({
            jwt: jwtToken
        })
        console.log(jwtToken);
        console.log('Token Verificado');
    } catch (error) {
        res.status(401).send('Token Invalido')
    }
})

app.listen(3000, () => {
    console.log('server at port 3000');
})