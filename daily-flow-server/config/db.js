const mongoose = require("mongoose");
const config = require("./config");
const DB_URL = config.db.url;

mongoose.set("strictQuery", false);

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("MongoDb is connected successfully!");
  })
  .catch((err) => {
    console.log(err);
  });
