const mongoose = require("mongoose");

const mongodba =
  "mongodb+srv://testuser:uwNwDi4mSN37Y1b9@cluster0.qknjvai.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(mongodba, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected To DB");
  })
  .catch((e) => {
    console.log(e);
  });
