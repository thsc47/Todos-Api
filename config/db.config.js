const mongoose = require("mongoose");

const MONGO_URI = "mongodb://localhost:27017/todos";

mongoose.connect(MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});