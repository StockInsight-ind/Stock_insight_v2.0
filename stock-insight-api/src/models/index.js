const sequelize = require("../config/database");

const User = require("./user")(sequelize);
const UserMarket = require("./userMarket")(sequelize);
const UserStock = require("./userStock")(sequelize);

// Associations
User.hasMany(UserMarket, {
    foreignKey: "user_id",
    as: "markets",
});

UserMarket.belongsTo(User, {
    foreignKey: "user_id",
});

User.hasMany(UserStock, {
    foreignKey: "user_id",
    as: "stocks",
});

UserStock.belongsTo(User, {
    foreignKey: "user_id",
});

module.exports = {
    sequelize,
    User,
    UserMarket,
    UserStock,
};