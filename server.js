import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCards.js'
import Cors from 'cors'

//App Config
const app = express()
const port = process.env.PORT || 8000
const connection_url = 'mongodb+srv://admin:admin@tindermern.b6qjjfa.mongodb.net/tinderDB'

//Middleware
app.use(express.json())
app.use(Cors())

//DB Config
mongoose.connect(connection_url)

//API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello TWD"))

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body
    Cards.create(dbCard)
            .then(data => res.status(201).send(data))
            .catch(err => res.status(500).send(err))
})

app.get('/tinder/cards', (req, res) => {
    Cards.find()
            .then(data => res.status(200).send(data))
            .catch(err => res.status(500).send(err))
})

//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`))