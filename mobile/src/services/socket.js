import socketio from "socket.io-client"

const socket = socketio('http://localhost:3333', {
    autoConnect: false,
})

function subscribeToNewDevs(subscribeFunction) {
    console.log('subscribing to live devs update');
    socket.on('new-dev', data => { console.log(data); subscribeFunction(data); })
}

function connect(latitude, longitude, techs) {

    socket.io.opts.query = {
        latitude,
        longitude,
        techs,
    }

    socket.connect()
}

function disconnect() {
    if (socket.connected) {
        socket.disconnect()
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs,
}