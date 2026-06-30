require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/database");

const PORT = process.env.PORT || 5050;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");

    await sequelize.sync();

    console.log("Models synchronized.");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
};
 
startServer();