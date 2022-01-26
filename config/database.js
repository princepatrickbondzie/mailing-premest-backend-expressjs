const mongoose = require("mongoose");

mongoose
  .connect(process.env.dbURL, {})
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err.message));
