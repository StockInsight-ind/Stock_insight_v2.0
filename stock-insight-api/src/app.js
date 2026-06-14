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



const express = require('express');

const cors = require('cors');

const userRoutes =
require('./Routes/userroutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/users',userRoutes);

app.listen(5000,()=>{

    console.log(
        "Server running on port 5000"
    );
});