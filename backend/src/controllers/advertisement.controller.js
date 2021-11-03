const AdvertisementModel = require('../models/advertisement.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');


/******************************************************************************
 *                              Advertisement Controller
 ******************************************************************************/

class AdvertisementController {
     getAllAdvertisements = async (req, res, next) => {
        let advertisementList = await AdvertisementModel.find();
        if (!advertisementList.length) {
            throw new HttpException(404, 'Advertisements not found');
        }

        advertisementList = advertisementList.map(advertisement => {
            const { password, ...advertisementWithoutPassword } = advertisement;
            return advertisementWithoutPassword;
        });

        res.send(advertisementList);
    };

    getAdvertisementById = async (req, res, next) => {
        const advertisement = await AdvertisementModel.findOne({ id: req.params.id });
        if (!advertisement) {
            throw new HttpException(404, 'Advertisement not found');
        }

        const { password, ...userWithoutPassword } = advertisement;

        res.send(userWithoutPassword);
    };

    getAdvertisementBytitle = async (req, res, next) => {
        const advertisement = await AdvertisementModel.findOne({ title: req.params.title });
        if (!advertisement) {
            throw new HttpException(404, 'Advertisement not found');
        }

        const { password, ...advertisementWithoutPassword } = advertisement;

        res.send(advertisementWithoutPassword);
    };

    getAdvertisementByCompanyId = async (req, res, next) => {
        let advertisementList = await AdvertisementModel.findBy({ companyId: req.params.companyId});
        
        if (!advertisementList.length) {
            throw new HttpException(404, 'Advertisements not found');
        }

        advertisementList = advertisementList.map(advertisement => {
            const { password, ...advertisementWithoutPassword } = advertisement;
            return advertisementWithoutPassword;
        });

        res.send(advertisementList);
    };


    getCurrentUser = async (req, res, next) => {
        const { password, ...advertisementWithoutPassword } = req.currentUser;

        res.send(advertisementWithoutPassword);
    };

    createAdvertisement = async (req, res, next) => {
        //this.checkValidation(req);


        const result = await AdvertisementModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send({message: "Advertisement was created!"});
    };

    updateAdvertisement = async (req, res, next) => {
        //this.checkValidation(req);

        const { confirm_password, ...restOfUpdates } = req.body;

        // do the update query and get the result
        // it can be partial edit
        const result = await AdvertisementModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Advertisement not found' :
            affectedRows && changedRows ? 'Advertisement updated successfully' : 'Update failed';

        res.send({ message, info });
    };

    deleteAdvertisement = async (req, res, next) => {
        const result = await AdvertisementModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Advertisement not found');
        }
        res.send('Advertisement has been deleted');
    };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new AdvertisementController;