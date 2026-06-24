const { pool } = require('./database_communication');

const normalizeMarket = (market) => String(market || '').trim().toLowerCase();

const normalizeStock = (stock) => String(stock || '').trim().toUpperCase();

const findByEmail = async (email) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );

    return result.rows[0];
};

const createUser = async (user) => {
    const result = await pool.query(
        `
        INSERT INTO users
            (first_name, last_name, email, password, onboarding_completed)
        VALUES
            ($1, $2, $3, $4, $5)
        RETURNING id, first_name, last_name, email, onboarding_completed
        `,
        [
            user.firstName,
            user.lastName,
            user.email,
            user.password,
            false
        ]
    );

    return result.rows[0];
};

const setOnboardingCompleted = async (client, userId, onboardingCompleted = true) => {
    await client.query(
        `
        UPDATE users
        SET onboarding_completed = $1,
            updated_at = NOW()
        WHERE id = $2
        `,
        [onboardingCompleted, userId]
    );
};

const getPreferencesByUserId = async (userId) => {
    const [userResult, marketsResult, stocksResult] = await Promise.all([
        pool.query(
            'SELECT id, first_name, last_name, email, onboarding_completed FROM users WHERE id = $1',
            [userId]
        ),
        pool.query(
            'SELECT market FROM user_markets WHERE user_id = $1 ORDER BY id ASC',
            [userId]
        ),
        pool.query(
            'SELECT market, stock FROM user_stocks WHERE user_id = $1 ORDER BY id ASC',
            [userId]
        )
    ]);

    const stocks = stocksResult.rows.reduce((accumulator, row) => {
        const market = normalizeMarket(row.market);

        if (!accumulator[market]) {
            accumulator[market] = [];
        }

        accumulator[market].push(normalizeStock(row.stock));
        return accumulator;
    }, {});

    return {
        user: userResult.rows[0] || null,
        markets: marketsResult.rows.map((row) => normalizeMarket(row.market)),
        stocks
    };
};

const clearPreferences = async (client, userId) => {
    await client.query('DELETE FROM user_markets WHERE user_id = $1', [userId]);
    await client.query('DELETE FROM user_stocks WHERE user_id = $1', [userId]);
};

const addUserMarket = async (client, userId, market) => {
    await client.query(
        `
        INSERT INTO user_markets (user_id, market)
        VALUES ($1, $2)
        `,
        [userId, normalizeMarket(market)]
    );
};

const addUserStock = async (client, userId, market, stock) => {
    await client.query(
        `
        INSERT INTO user_stocks (user_id, market, stock)
        VALUES ($1, $2, $3)
        `,
        [userId, normalizeMarket(market), normalizeStock(stock)]
    );
};

module.exports = {
    findByEmail,
    createUser,
    setOnboardingCompleted,
    getPreferencesByUserId,
    clearPreferences,
    addUserMarket,
    addUserStock
};
