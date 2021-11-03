const express = require('express');
const router = express.Router();

const jobAppController = require('../controllers/jobapp.controller');
const handler = require('../middleware/handle.middleware');


router.get('/jobApp/', handler(jobAppController.getAllJobApps)); 
router.get('/jobApp/:id', handler(jobAppController.getJobAppById)); 
router.get('/jobApp/peopleId/:peopleId', handler(jobAppController.getJobAppByPeopleId));
router.get('/jobApp/advertisementId/:advertisementId', handler(jobAppController.getJobAppByAdvertisementId));

router.post('/jobApp/', handler(jobAppController.createJobApp)); 
router.patch('/jobApp/:id', handler(jobAppController.updateJobApp)); 
router.delete('/jobApp/:id', handler(jobAppController.deleteJobApp));



module.exports = router;