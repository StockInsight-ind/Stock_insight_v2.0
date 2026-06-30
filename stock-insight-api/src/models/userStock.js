// models/UserStock.js

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const UserStock = sequelize.define(
        "UserStock",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            market: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            stock: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "user_stocks",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return UserStock;
};