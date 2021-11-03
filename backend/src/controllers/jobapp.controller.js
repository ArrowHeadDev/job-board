const JobAppModel = require('../models/jobapp.model');
const HttpException = require('../utils/HttpException.utils');


/******************************************************************************
 *                              JobApp Controller
 ******************************************************************************/

class JobAppController {
     getAllJobApps = async (req, res, next) => {
        let JobAppList = await JobAppModel.find();
        if (!JobAppList.length) {
            throw new HttpException(404, 'JobApps not found');
        }

        JobAppList = JobAppList.map(JobApp => {
            const { password, ...userWithoutPassword } = JobApp;
            return userWithoutPassword;
        });

        res.send(JobAppList);
    };

    getJobAppById = async (req, res, next) => {
        const JobApp = await JobAppModel.findOne({ id: req.params.id });
        if (!JobApp) {
            throw new HttpException(404, 'JobApp not found');
        }

        const { password, ...userWithoutPassword } = JobApp;

        res.send(userWithoutPassword);
    };

     getJobAppByPeopleId = async (req, res, next) => {
        const JobApp = await JobAppModel.findBy({ peopleId: req.params.peopleId });
        if (!JobApp) {
            throw new HttpException(404, 'JobApp not found');
        }

        const { password, ...userWithoutPassword } = JobApp;

        res.send(userWithoutPassword);
    }; 

    
    getJobAppByAdvertisementId = async (req, res, next) => {
        const JobApp = await JobAppModel.findBy({ advertisementId: req.params.advertisementId });
        if (!JobApp) {
            throw new HttpException(404, 'JobApp not found');
        }

        const { password, ...userWithoutPassword } = JobApp;

        res.send(userWithoutPassword);
    }; 

    createJobApp = async (req, res, next) => {
        //this.checkValidation(req);


        const result = await JobAppModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send({message: "JobApp was created!"});
    };

    updateJobApp = async (req, res, next) => {
        //this.checkValidation(req);

        const { confirm_password, ...restOfUpdates } = req.body;

        // do the update query and get the result
        // it can be partial edit
        const result = await JobAppModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'JobApp not found' :
            affectedRows && changedRows ? 'JobApp updated successfully' : 'Update failed';

        res.send({ message, info });
    };

    deleteJobApp = async (req, res, next) => {
        const result = await JobAppModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'JobApp not found');
        }
        res.send('JobApp has been deleted');
    };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new JobAppController;