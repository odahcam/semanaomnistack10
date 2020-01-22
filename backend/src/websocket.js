const socketio = require('socket.io')
const parseStringAsArray = require('./utils/parseStringAsArray')
const calculateDistance = require('./utils/calculateDistance')

let io
const connections = []

module.exports.setupWebsocket = (server) => {

    io = socketio(server)

    io.on('connection', socket => {

        const { latitude, longitude, techs } = socket.handshake.query

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        })
    })

}

module.exports.findConnections = (coordinates, techs) => {

    const techsUpper = techs.map(x => x.toLocaleUpperCase())

    const conns = connections.filter(connection => {        
        const isLessThan10Km = calculateDistance(coordinates, connection.coordinates) < 10
        return isLessThan10Km
            && connection.techs.map(x => x.toLocaleUpperCase())
                .some(item => techsUpper.includes(item))
    })

    return conns
}

module.exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data)
    })
}
