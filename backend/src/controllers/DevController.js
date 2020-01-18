const axios = require('axios')
const Dev = require("../models/Dev");

module.exports = {

    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {

        const { github_username, techs, latitude, longitude } = request.body;

        const dev = await Dev.findOne({ github_username });

        if (dev) {
            return response.json(dev);
        }

        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

        const { name = login, avatar_url, bio } = apiResponse.data;

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        };

        const created = await Dev.create({
            name,
            avatar_url,
            bio,
            github_username,
            techs,
            location
        });

        return response.json(created);
    },

    async update(request, response) {

        const devSent = request.body;
        const id = request.uri.id;

        const dev = await Dev.findOne({ id });

        if (!dev) {
            return response.status(404);
        }

        const dataToUpdate = {
            ...dev,
            nome: devSent.nome,
            bio: devSent.bio,
            avatar_url: devSent.avatar_url,
        }

        try {
            await Dev.updateOne({ id }, dataToUpdate)
        }
        catch (e) {
            return response.status(500)
        }

        return response.json(dev);
    },

    async destroy(request, response) {

        const id = request.uri.id;

        try {
            await Dev.deleteOne({ id })
        } catch (e) {
            return response.status(200)
        }

        return response.status(200)
    },

}