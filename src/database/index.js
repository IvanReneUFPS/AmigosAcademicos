const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost/academicosdb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then((db) => {
        console.log("db is connected");
    })
    .catch((err) => {
        console.log(err);
    });
