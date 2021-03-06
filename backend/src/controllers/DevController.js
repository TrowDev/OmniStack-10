const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

// Controllers geralmente tem 5 funções:
// index, show, store, update, destroy

module.exports = {

    async index(req, res) {
        const devs = await Dev.find();
        return res.json(devs);
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [latitude, longitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
            // Filtrar conexões que estão em um raio de 10km de distância.
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray);
            console.log(sendSocketMessageTo);
            sendMessage(sendSocketMessageTo, 'new-dev', dev);

            return res.json(dev);
        } else {
            res.status(200).json({
                message: 'Usuário já cadastrado.'
            });
        }
    }
}