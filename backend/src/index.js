const express = require('express')
const mongoose = require('mongoose')
const { routes } = require('./routes')

const app = express()
exports.app = app

mongoose.connect('mongodb+srv://omnistack:omnistack@semana-omnistack-10-c3ksr.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json())
app.use(routes)

app.listen(3333)
