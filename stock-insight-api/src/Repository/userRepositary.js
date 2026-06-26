const { User, UserMarket, UserStock, sequelize } = require("../models");

const normalizeMarket = (market) =>
    String(market || "").trim().toLowerCase();

const normalizeStock = (stock) =>
    String(stock || "").trim().toUpperCase();


// -------------------------
// USER
// -------------------------

const findByEmail = async (email) => {
    return await User.findOne({
        where: { email },
    });
};

const createUser = async (user) => {
    const created = await User.create({
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password,
        onboarding_completed: false,
    });

    // return clean object (like RETURNING in SQL)
    return {
        id: created.id,
        first_name: created.first_name,
        last_name: created.last_name,
        email: created.email,
        onboarding_completed: created.onboarding_completed,
    };
};

const setOnboardingCompleted = async (userId, onboardingCompleted = true) => {
    await User.update(
        {
            onboarding_completed: onboardingCompleted,
            updated_at: new Date(),
        },
        {
            where: { id: userId },
        }
    );
};


// -------------------------
// PREFERENCES
// -------------------------

const getPreferencesByUserId = async (userId) => {
    const user = await User.findByPk(userId, {
        attributes: [
            "id",
            "first_name",
            "last_name",
            "email",
            "onboarding_completed",
        ],
        include: [
            {
                model: UserMarket,
                as: "markets",
                attributes: ["market"],
            },
            {
                model: UserStock,
                as: "stocks",
                attributes: ["market", "stock"],
            },
        ],
    });

    if (!user) return null;

    const groupedStocks = user.stocks.reduce((acc, row) => {
        const market = normalizeMarket(row.market);

        if (!acc[market]) acc[market] = [];

        acc[market].push(normalizeStock(row.stock));
        return acc;
    }, {});

    return {
        user: {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            onboarding_completed: user.onboarding_completed,
        },
        markets: user.markets.map((m) => normalizeMarket(m.market)),
        stocks: groupedStocks,
    };
};



const clearPreferences = async (userId) => {
    await Promise.all([
        UserMarket.destroy({ where: { user_id: userId } }),
        UserStock.destroy({ where: { user_id: userId } }),
    ]);
};

const addUserMarket = async (userId, market) => {
    await UserMarket.create({
        user_id: userId,
        market: normalizeMarket(market),
    });
};

const addUserStock = async (userId, market, stock) => {
    await UserStock.create({
        user_id: userId,
        market: normalizeMarket(market),
        stock: normalizeStock(stock),
    });
};


module.exports = {
    findByEmail,
    createUser,
    setOnboardingCompleted,
    getPreferencesByUserId,
    clearPreferences,
    addUserMarket,
    addUserStock,
};