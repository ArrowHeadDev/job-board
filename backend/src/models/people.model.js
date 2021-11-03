const query = require('../db/configDB');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/peopleRole.utils');

class PeopleModel {
    tableName = 'peoples';

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

        // return back the first row (user)
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
    

    create = async ({ name, firstName, email, password = null, address, postalCode, city, birthDate, cv = null, website = null, picture = null, isAdmin = 0 , phone, gender, role = Role.User}) => {
        const sql = `INSERT INTO ${this.tableName}
        (name, firstName, email, password, address, postalCode, city, birthDate, cv, website, picture, isAdmin, phone, gender, role) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

        const result = await query(sql, [name, firstName, email, password, address, postalCode, city, birthDate, cv, website, picture, isAdmin, phone, gender, role]);
        const affectedRows = result ? result.affectedRows : 0;

        return [affectedRows, result];
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE peoples SET ${columnSet} WHERE id = ?`;

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

module.exports = new PeopleModel;