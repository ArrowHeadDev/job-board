const query = require('../db/configDB');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/peopleRole.utils');

class CompanyModel {
    tableName = 'companies';

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

        // return back the first row (company)
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

    create = async ({ name, email, password, activities, address = null, postalCode, city, siret = null, numberEmployees, website = null, phone, contactName, role = Role.Company}) => {
        const sql = `INSERT INTO ${this.tableName}
        (name, email, password, activities, address, postalCode, city, siret, numberEmployees, website, phone, contactName, role) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;

        const result = await query(sql, [name, email, password, activities, address, postalCode, city, siret, numberEmployees, website, phone, contactName, role]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE companies SET ${columnSet} WHERE id = ?`;

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

module.exports = new CompanyModel;