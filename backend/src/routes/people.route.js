const express = require('express');
const router = express.Router();
const peopleController = require('../controllers/people.controller');
const auth = require('../middleware/peopleAuth.middleware');
const Role = require('../utils/peopleRole.utils');
const handler = require('../middleware/handle.middleware');

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');


// createUserSchema, updateUserSchema for the validation 
// auth() validate the token -- auth(Role.Company) validate the token and the role


router.get('/people/', handler(peopleController.getAllUsers)); 
router.get('/people/:id' ,handler(peopleController.getUserById)); 
router.get('/name/:name',  handler(peopleController.getUserByuserName)); 
router.get('/user/whoami', handler(peopleController.getCurrentUser)); 

router.post('/people/register', handler(peopleController.createUser)); 
router.patch('/people/:id', handler(peopleController.updateUser)); 
router.delete('/people/:id', handler(peopleController.deleteUser)); 


router.post('/people/login'/* , auth(Role.Company) */, handler(peopleController.userLogin)); 

module.exports = router;