require("dotenv").config();
require("./config/database");
const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoutes");
const mailRoutes = require("./routes/mailRoutes");

app.use(express.json());

app.use("/api",
    userRoutes,
    mailRoutes
);

app.listen(9000, () => console.log("Server connected smoothly..."));
