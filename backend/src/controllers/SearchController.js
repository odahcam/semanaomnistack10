const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {

    /**
     * buscar todos os devs num raio de 10km
     * buscar por tecnologia
     * @param {*} request 
     * @param {*} response 
     */
    async index(request, response) {

        const { latitude, longitude, techString } = request.query;

        console.log(latitude, longitude, techString)

        const techs = parseStringAsArray(techString)

        const devs = Dev.find({
            techs: {
                $in: techs,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $masDistance: 10000,
                },
            },
        })

        return response.json({ devs });
    },

}