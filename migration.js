const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'new_test',
};

async function runMigrations() {
    const connection = await mysql.createConnection(dbConfig);

    try {
        await connection.beginTransaction();

        await connection.execute(`
            CREATE TABLE IF NOT EXISTS items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(50) NOT NULL
            )
        `);

        await connection.execute(`
            CREATE TABLE IF NOT EXISTS combinations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                combination VARCHAR(255) NOT NULL
            )
        `);

        await connection.execute(`
            CREATE TABLE IF NOT EXISTS responses (
                id INT AUTO_INCREMENT PRIMARY KEY,
                combination_id INT,
                response JSON,
                FOREIGN KEY (combination_id) REFERENCES combinations(id) ON DELETE CASCADE
            )
        `);

        await connection.commit();
        console.log('Миграции выполнены успешно.');
    } catch (error) {
        await connection.rollback();
        console.error('Ошибка при выполнении миграций:', error);
    } finally {
        await connection.end();
    }
}

runMigrations();