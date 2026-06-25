const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { pool } = require('../Repositary/database_communication');
const userRepository = require('../Repositary/userRepositary');

const normalizeMarket = (market) => String(market || '').trim().toLowerCase();

const normalizeStock = (stock) => String(stock || '').trim().toUpperCase();

const registerUser = async (user) => {
    const existingUser = await userRepository.findByEmail(user.email);

    if (existingUser) {
        throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    return userRepository.createUser(user);
};

const loginUser = async (email, password) => {
    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email
        },
        process.env.JWT_SECRET || 'stocksecret',
        {
            expiresIn: '24h'
        }
    );

    return {
        token,
        user: {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            onboarding_completed: Boolean(user.onboarding_completed)
        }
    };
};

const getUserPreferences = async (userId) => {
    return userRepository.getPreferencesByUserId(userId);
};

const saveUserPreferences = async (userId, preferences) => {
    const markets = Array.isArray(preferences.markets)
        ? [...new Set(preferences.markets.map(normalizeMarket).filter(Boolean))]
        : [];

    const stocks = preferences.stocks && typeof preferences.stocks === 'object'
        ? preferences.stocks
        : {};

    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        await userRepository.clearPreferences(client, userId);

        for (const market of markets) {
            await userRepository.addUserMarket(client, userId, market);
        }

        for (const [market, symbols] of Object.entries(stocks)) {
            const normalizedMarket = normalizeMarket(market);
            const marketSymbols = Array.isArray(symbols) ? symbols : [];

            for (const symbol of marketSymbols) {
                const normalizedSymbol = normalizeStock(symbol);

                if (!normalizedMarket || !normalizedSymbol) {
                    continue;
                }

                await userRepository.addUserStock(client, userId, normalizedMarket, normalizedSymbol);
            }
        }

        await userRepository.setOnboardingCompleted(client, userId, true);
        await client.query('COMMIT');

        return userRepository.getPreferencesByUserId(userId);
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserPreferences,
    saveUserPreferences
};
