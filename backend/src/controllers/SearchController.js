const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, res) {
        const { latitude, longitude, techs } = req.query;

        const techsArray = parseStringAsArray(techs);
        let devs = [];
        if(techs.length > 0){
            devs = await Dev.find({
                techs: {
                    $in: techsArray,
                },
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [latitude, longitude],
                        },
                        $maxDistance: 10000,
                    }
                }
            });
        }else{
            devs = await Dev.find({
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [latitude, longitude],
                        },
                        $maxDistance: 10000,
                    }
                }
            });
        }
        res.json(devs);
    }
}



