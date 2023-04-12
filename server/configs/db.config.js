const mongoose = require("mongoose");

// Load URI from env
mongoose
  .connect(
    "mongodb+srv://root:root@cluster0.1wazf2f.mongodb.net/?retryWrites=true&w=majority",
    { dbName: "sploot_demo" }
  )
  .then(() => {
    console.log("Connected");
  })
  .catch((e) => console.log(e));

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDb");
});

mongoose.connection.on("error", (e) => {
  console.log(e.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDb");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
