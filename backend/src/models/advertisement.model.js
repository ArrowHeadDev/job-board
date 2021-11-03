const query = require('../db/configDB');
const { multipleColumnSet } = require('../utils/common.utils');
const moment = require('moment');


// Advertisement Model used in the controller
class AdvertisementModel {
    tableName = 'advertisements';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (advertisement)
        return result[0];
    }

    findBy = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back all the rows linked to a element
        return result;
    }

    create = async ({ title, category, description, address, publishDate = moment().format('YYYY-MM-DD HH:mm:ss'), companyId, resume, contratType, wages}) => {
        const sql = `INSERT INTO ${this.tableName}
        (title, category, description, address, publishDate, companyId, resume, contratType, wages) VALUES (?,?,?,?,?,?,?,?,?)`;

        const result = await query(sql, [title, category, description, address, publishDate, companyId, resume, contratType, wages]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE advertisements SET ${columnSet} WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new AdvertisementModel;