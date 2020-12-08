require('dotenv').config()
const express = require('express')
const massive = require('massive')
const productCtrl = require('./products_controller')

const app = express()

const { SERVER_PORT, CONNECTION_STRING } = process.env

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then(dbInstance => {
    console.log('DB is ready')
    app.set('db', dbInstance)
    app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))
}).catch((err) => console.log(err));


app.use(express.json())

app.get('/api/products', productCtrl.getAll)
app.get('/api/products/:id', productCtrl.getOne)
app.put('/api/products/:id', productCtrl.update)
app.post('/api/products', productCtrl.create)
app.delete('/api/products/:id', productCtrl.delete)