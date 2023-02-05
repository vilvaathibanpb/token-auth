const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const router = require("./router");
const app = express();

const port = 5000;
const dbURI = 'mongodb://127.0.0.1:27017/token-auth';

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors())
app.use("/", router);

mongoose.connection.on("connected", function () {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});

mongoose.connection.on("error", function (err) {
  console.log("Mongoose default connection error: " + err);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
});
