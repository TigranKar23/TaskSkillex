const pool = require('../db');

class ItemModel {
    static async addItem(name) {
        const [result] = await pool.execute('INSERT INTO items (name) VALUES (?)', [name]);
        return result.insertId;
    }

    static async getItems() {
        const [rows] = await pool.execute('SELECT * FROM items');
        return rows;
    }
}

module.exports = ItemModel;