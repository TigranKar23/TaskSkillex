const pool =require('./../db');
// const ItemModel = require('../models/itemModel');
const CombinationModel = require('../models/combinationModel');
const ResponseModel = require('../models/responseModel');
const Helper = require('../helpers/helper')

async function generate(req, res) {
    const { items, length } = req.body;

    // const items = await ItemModel.getAllItems();

    if (!Array.isArray(items) || typeof length !== 'number') {
        return res.status(400).send({ error: 'Invalid input format' });
    }

    for (const item of items) {
        if (typeof item !== 'string') {
            return res.status(400).send({ error: 'All items must be strings' });
        }
    }
    const combinations = Helper.generateCombinations(items, length);

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const combinationId = await CombinationModel.addCombination(combinations);

        const response = { id: combinationId, combination: combinations };
        await ResponseModel.addResponse(combinationId, response);

        await connection.commit();
        res.json(response);
    } catch (error) {
        if (connection) await connection.rollback();
        res.status(500).send({ error: 'Database error', details: error.message });
    } finally {
        if (connection) connection.release();
    }
}

module.exports = { generate };