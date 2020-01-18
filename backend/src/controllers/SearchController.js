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

        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs)

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
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

        return response.json(devs);
    },

}