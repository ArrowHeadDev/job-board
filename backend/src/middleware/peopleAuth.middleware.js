const HttpException = require('../utils/HttpException.utils');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const peopleModel = require('../models/people.model');
dotenv.config();

const auth = (...roles) => {
    return async function (req, res, next) {
        try {
/*             const authHeader = req.headers.authorization;
            const bearer = 'Bearer ';

            if (!authHeader || !authHeader.startsWith(bearer)) {
                throw new HttpException(401, 'Access denied. No credentials sent!');
            }

            const token = authHeader.replace(bearer, ''); */
            
            const token = req.cookies.access_token;

            if (!token) {
                throw new HttpException(401, 'Access denied. No credentials sent!');
            }

            const secretKey = process.env.SECRET_JWT || "";

            
            const decoded = jwt.verify(token, secretKey);
            const user = await peopleModel.findOne({ id: decoded.user_id });
            const userRole = decoded.user_role;
            

            if (!user) {
                throw new HttpException(401, 'Authentication failed!');
            }


            const rolePermission = roles.includes(userRole);
            const userId = user.id;
            const ownerAuthorized = req.params.id == userId;


            if (!rolePermission && ownerAuthorized || !ownerAuthorized && roles.length ) {
                throw new HttpException(401, 'Unauthorized');
                
            } else {
    // Only if the user has the right permissions!
            req.currentUser = user;
            next();
            }



        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
}

module.exports = auth;