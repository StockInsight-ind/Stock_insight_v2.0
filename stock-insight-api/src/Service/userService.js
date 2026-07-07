const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
    sequelize,
} = require("../models");

const userRepository = require("../Repository/userRepositary");

const normalizeMarket = (market) =>
    String(market || "").trim().toLowerCase();

const normalizeStock = (stock) =>
    String(stock || "").trim().toUpperCase();


// -------------------------
// REGISTER
// -------------------------

const registerUser = async (user) => {
    const existingUser = await userRepository.findByEmail(user.email);

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    return await userRepository.createUser({
        ...user,
        password: hashedPassword,
    });
};


// -------------------------
// LOGIN
// -------------------------

const loginUser = async (email, password) => {
    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET || "stocksecret",
        {
            expiresIn: "24h",
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


// -------------------------
// GET PREFERENCES
// -------------------------

const getUserPreferences = async (userId) => {
    return await userRepository.getPreferencesByUserId(userId);
};


// -------------------------
// SAVE PREFERENCES (TRANSACTION FIXED)
// -------------------------

const saveUserPreferences = async (userId, preferences) => {
    const markets = Array.isArray(preferences.markets)
        ? [...new Set(preferences.markets.map(normalizeMarket).filter(Boolean))]
        : [];

    const stocks =
        preferences.stocks && typeof preferences.stocks === "object"
            ? preferences.stocks
            : {};

    const result = await sequelize.transaction(async (t) => {
        // pass transaction to repository methods

        await userRepository.clearPreferences(userId, { transaction: t });

        for (const market of markets) {
            await userRepository.addUserMarket(userId, market, { transaction: t });
        }

        for (const [market, symbols] of Object.entries(stocks)) {
            const normalizedMarket = normalizeMarket(market);
            const marketSymbols = Array.isArray(symbols) ? symbols : [];

            for (const symbol of marketSymbols) {
                const normalizedSymbol = normalizeStock(symbol);

                if (!normalizedMarket || !normalizedSymbol) continue;

                await userRepository.addUserStock(
                    userId,
                    normalizedMarket,
                    normalizedSymbol,
                    { transaction: t }
                );
            }
        }

        await userRepository.setOnboardingCompleted(userId, true, {
            transaction: t,
        });

        return await userRepository.getPreferencesByUserId(userId);
    });

    return result;
};


// -------------------------
// EXPORTS
// -------------------------

module.exports = {
    registerUser,
    loginUser,
    getUserPreferences,
    saveUserPreferences,
};