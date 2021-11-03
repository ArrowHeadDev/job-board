const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company.controller');
const auth = require('../middleware/companyAuth.middleware');
const Role = require('../utils/peopleRole.utils');
const handler = require('../middleware/handle.middleware');



router.get('/company/', handler(companyController.getAllCompanies)); 
router.get('/company/:id', handler(companyController.getCompanyById)); 
router.get('/company/email/:email', handler(companyController.getCompanyByEmail)); 
router.get('/company/whoami', auth(Role.Company), handler(companyController.getCurrentCompany));

router.post('/company/register', handler(companyController.createCompany)); 
router.patch('/company/:id', handler(companyController.updateCompany)); 
router.delete('/company/:id', handler(companyController.deleteCompany)); 


router.post('/company/login', handler(companyController.companyLogin)); 

module.exports = router;