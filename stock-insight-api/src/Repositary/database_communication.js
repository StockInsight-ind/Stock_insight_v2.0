const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const initDb = async () => {
    const maxAttempts = 10;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            await pool.query('SELECT 1');

            await pool.query(`
                ALTER TABLE users DROP COLUMN IF EXISTS market;
            `);

            await pool.query(`
                DROP TABLE IF EXISTS user_stocks;
            `);

            await pool.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    first_name VARCHAR(100) NOT NULL,
                    last_name VARCHAR(100) NOT NULL,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                )
            `);

            console.log('Database initialized successfully');
            return;
        } catch (error) {
            console.warn(`Database initialization attempt ${attempt} failed: ${error.message}`);
            if (attempt === maxAttempts) {
                throw error;
            }
            await wait(2000);
        }
    }
};

module.exports = {
    pool,
    initDb
};