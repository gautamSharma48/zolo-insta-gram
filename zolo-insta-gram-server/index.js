const express = require("express");
const mongoose = require("mongoose");
const app = express();

const connectDb = () => {
  mongoose
    .connect(
      "mongodb+srv://gautamSharma:<password>@cluster0.yghyhi5.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("connected with db"))
    .catch((err) => console.log(err));
};

app.use(express.json());
app.use("/", router);

app.listen(PORT, () => {
  connectDb();
  console.log(`server connected with ${PORT}`);
});

app.listen(Port, () => console.log(`server is running on ${Port}`));
