const jwt = require('jsonwebtoken');
const config = require('../config');


function generateToken(userId){

    return jwt.sign(
        {
            id:userId
        },
        config.jwtSecret,
        {
            expiresIn: config.jwtExpiresIn
        }
    );

}


module.exports = generateToken;