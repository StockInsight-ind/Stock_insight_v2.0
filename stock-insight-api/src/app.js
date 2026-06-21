// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/health", (req, res) => {
//   res.status(200).json({
//     service: "stock-insight-api",
//     status: "healthy"
//   });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



require('dotenv').config();

const express = require('express');

const cors = require('cors');

const userRoutes = require('./Routes/userroutes');
const marketRoutes = require('./Routes/marketRoutes');
const { initDb } = require('./Repositary/database_communication');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/markets', marketRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 5050;

const startServer = async () => {
    try {
        await initDb();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to initialize database:', error);
        process.exit(1);
    }
};

startServer();
