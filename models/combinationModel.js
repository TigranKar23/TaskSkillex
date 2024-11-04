const pool = require('../db');

class CombinationModel {
    static async addCombination(combination) {
        const [result] = await pool.execute(
            'INSERT INTO combinations (combination) VALUES (?)',
            [JSON.stringify(combination)]
        );
        return result.insertId;
    }

    static async getCombinationById(id) {
        const [rows] = await pool.execute('SELECT * FROM combinations WHERE id = ?', [id]);
        return rows[0];
    }

    static async getAllCombinations() {
        const [rows] = await pool.execute('SELECT * FROM combinations');
        return rows;
    }
}

module.exports = CombinationModel;
