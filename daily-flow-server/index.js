const app = require("./app");
const config = require("./config/config");
require("./config/db");

app.get("/", (req, res) => {
  res.status(201).json({ message: "DailyFlow backend server." });
});

app.use("*", (req, res) => {
  res.status(400).json({ message: "Routes not Found!!!" });
});

// Listening to the express app
app.listen(config.app.port, () => {
  console.log(
    `DailyFlow server is running at http://localhost:${config.app.port}`
  );
});
