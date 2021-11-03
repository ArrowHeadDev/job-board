const CompanyModel = require('../models/company.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');

const dayjs = require('dayjs');


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Company Controller
 ******************************************************************************/

class CompanyController {
     getAllCompanies = async (req, res, next) => {
        let companyList = await CompanyModel.find();

        if (!companyList.length) {
            throw new HttpException(404, 'Companies not found');
        }

        companyList = companyList.map(company => {
            const { password, ...companyWithoutPassword } = company;
            return companyWithoutPassword;
        });

        res.send(companyList);
    };

    getCompanyById = async (req, res, next) => {
        const company = await CompanyModel.findOne({ id: req.params.id });
        if (!company) {
            throw new HttpException(404, 'Company not found');
        }

        const { password, ...companyWithoutPassword } = company;

        res.send(companyWithoutPassword);
    };

    getCompanyByEmail = async (req, res, next) => {
        const company = await CompanyModel.findOne({ email: req.params.email });
        if (!company) {
            throw new HttpException(404, 'Company not found');
        }

        const { password, ...companyWithoutPassword } = company;

        res.send(companyWithoutPassword);
    };

    getCurrentCompany = async (req, res, next) => {
        const { password, ...companyWithoutPassword } = req.currentCompany;

        res.send(companyWithoutPassword);
    };

    createCompany = async (req, res, next) => {
        //this.checkValidation(req);

        await this.hashPassword(req);

        const result = await CompanyModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send({message: "Company was created!"});
    };

    updateCompany = async (req, res, next) => {
       // this.checkValidation(req);

        await this.hashPassword(req);

        const { confirm_password, ...restOfUpdates } = req.body;

        // do the update query and get the result
        // it can be partial edit if you want to !
        const result = await CompanyModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Company not found' :
            affectedRows && changedRows ? 'Company updated successfully' : 'Update failed';

        res.send({ message, info });
    };

    deleteCompany = async (req, res, next) => {
        const result = await CompanyModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Company not found');
        }
        res.send('Company has been deleted');
    };

    companyLogin = async (req, res, next) => {
        //this.checkValidation(req); // Validation 

        const { email, password: pass } = req.body;

        const company = await CompanyModel.findOne({ email });

        if (!company) {
            throw new HttpException(401, 'Unable to login!');
        }

        const isMatch = await bcrypt.compare(pass, company.password);

        if (!isMatch) {
            throw new HttpException(401, 'Incorrect password!');
        }

        // Company matched!
        const secretKey = process.env.SECRET_JWT || "";
        const token = jwt.sign({ company_id: company.id.toString(), company_role: company.role.toString() }, secretKey, {
            expiresIn: '24h'
        });

        const { password, ...companyWithoutPassword } = company;

       //res.send({ ...companyWithoutPassword, token });

       res.cookie('access_token', token, {
        expires  : dayjs().add(1, "days").toDate(),
        secure: false /* || process.env.NODE_ENV !== "development" */,
        httpOnly : true,
        sameSite: 'Lax'
      });
      res.status(200).send({ ...companyWithoutPassword});
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
module.exports = new CompanyController;