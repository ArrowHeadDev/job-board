const PeopleModel = require('../models/people.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');

const dayjs = require('dayjs');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              User Controller
 ******************************************************************************/

class PeopleController {
     getAllUsers = async (req, res, next) => {
        let userList = await PeopleModel.find();
        
        if (!userList.length) {
            throw new HttpException(404, 'Users not found');
        }

        userList = userList.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        res.send(userList);
    };

    getUserById = async (req, res, next) => {
        const user = await PeopleModel.findOne({ id: req.params.id });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;

        res.send(userWithoutPassword);
    };

    getUserByuserName = async (req, res, next) => {
        const user = await PeopleModel.findOne({ name: req.params.name });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;

        res.send(userWithoutPassword);
    };

    getCurrentUser = async (req, res, next) => {
        const { password, ...userWithoutPassword } = req.currentUser;

        res.send(userWithoutPassword);
    };

    createUser = async (req, res, next) => {
        //this.checkValidation(req);

        await this.hashPassword(req);

        const result = await PeopleModel.create(req.body);

        if (!result[0]) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send({message: "User was created!", userId: result[1].insertId});
    };

    updateUser = async (req, res, next) => {
        //this.checkValidation(req);

        await this.hashPassword(req);

        const { confirm_password, ...restOfUpdates } = req.body;

        // do the update query and get the result
        // it can be partial edit
        const result = await PeopleModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'User not found' :
            affectedRows && changedRows ? 'User updated successfully' : 'Update failed';

        res.send({ message, info });
    };

    deleteUser = async (req, res, next) => {
        const result = await PeopleModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'User not found');
        }
        res.send('User has been deleted');
    };

    userLogin = async (req, res, next) => {
        //this.checkValidation(req);
        new Date(Date.now() + 999999)
        const { email, password: pass } = req.body;

        const user = await PeopleModel.findOne({ email });

        if (!user) {
            throw new HttpException(401, 'Unable to login!');
        }

        const isMatch = await bcrypt.compare(pass, user.password);

        if (!isMatch) {
            throw new HttpException(401, 'Incorrect password!');
        }

        // user matched!
        const secretKey = process.env.SECRET_JWT || "";
        const token = jwt.sign({ user_id: user.id.toString(), user_role: user.role.toString() }, secretKey, {
            expiresIn: '24h'
        });

        const { password, isAdmin, ...userWithoutPassword } = user;

          res.cookie('access_token', token, {
            expires  : dayjs().add(1, "days").toDate(),
            secure: false /* false || process.env.NODE_ENV !== "development" */,
            httpOnly : false,
            sameSite: 'Lax'
          });
          res.status(200).send({ ...userWithoutPassword});

        // Store the jwt directly in a cookie 
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation failed', errors);
        }
    }

    // hash password if it exists
    hashPassword = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
    }

}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new PeopleController;