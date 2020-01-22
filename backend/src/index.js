const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const cors = require('cors')
const { routes } = require('./routes')
const { setupWebsocket } = require('./websocket')

const app = express()
const server = http.Server(app)

mongoose.connect('mongodb+srv://omnistack:omnistack@semana-omnistack-10-c3ksr.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(3333)
setupWebsocket(server)
