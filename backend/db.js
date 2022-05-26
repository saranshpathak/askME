const mongoose = require("mongoose");

const url =
"mongodb://admin:admin@cluster0-shard-00-00.qh47x.mongodb.net:27017,cluster0-shard-00-01.qh47x.mongodb.net:27017,cluster0-shard-00-02.qh47x.mongodb.net:27017/?ssl=true&replicaSet=atlas-102ug8-shard-0&authSource=admin&retryWrites=true&w=majority";
module.exports.connect = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then(() => console.log("MongoDB is connected successfully"))
    .catch((err) => console.log("Error: ", err));
};
