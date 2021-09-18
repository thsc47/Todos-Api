const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const connect = async () => {
  try {
    const connection = await mongoose.connect(MONGO_URI, {useNewUrlParser: true,useUnifiedTopology: true,});
    console.log(
      `Successfully connected to DataBase:${connection.connections[0].name}`
    );
  } catch (error) {
    console.error("Error on Connect to DataBase");
  }
};

module.exports = connect;
