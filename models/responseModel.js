const pool = require('../db');

class ResponseModel {
    static async addResponse(combinationId, response) {
        const [result] = await pool.execute(
            'INSERT INTO responses (combination_id, response) VALUES (?, ?)',
            [combinationId, JSON.stringify(response)]
        );
        return result.insertId;
    }

    static async getResponseById(id) {
        const [rows] = await pool.execute('SELECT * FROM responses WHERE id = ?', [id]);
        return rows[0];
    }

    static async getAllResponses() {
        const [rows] = await pool.execute('SELECT * FROM responses');
        return rows;
    }
}

module.exports = ResponseModel;
