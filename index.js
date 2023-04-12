const express = require("express");
const config = require("./server/configs/server.config");
const bodyparser = require("body-parser");
const db = require("./server/configs/db.config");
// Initialising app
app = express();

// Adding body parse for post
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/api", require("./server/routes/auth.routes"));
app.use("/api", require("./server/routes/article.routes"));

app.listen(config.PORT, config.HOST);
