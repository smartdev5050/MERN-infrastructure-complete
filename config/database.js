const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
console.log(db);

db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("open", () =>
  console.log(
    `connected to mongo ${db.name} at db.host: ${db.host} db.port: ${db.port}`
  )
);
db.on("close", () => console.log("mongo disconnected"));
