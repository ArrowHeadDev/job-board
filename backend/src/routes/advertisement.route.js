const express = require('express');
const router = express.Router();
const advertisementController = require('../controllers/advertisement.controller');
const handler = require('../middleware/handle.middleware');



router.get('/advertisement/', handler(advertisementController.getAllAdvertisements)); 
router.get('/advertisement/:id', handler(advertisementController.getAdvertisementById)); 
router.get('/advertisement/title/:title', handler(advertisementController.getAdvertisementBytitle));
router.get('/advertisement/companyId/:companyId', handler(advertisementController.getAdvertisementByCompanyId)); 
router.post('/advertisement/', handler(advertisementController.createAdvertisement)); 
router.patch('/advertisement/:id', handler(advertisementController.updateAdvertisement)); 
router.delete('/advertisement/:id', handler(advertisementController.deleteAdvertisement));
    


module.exports = router;