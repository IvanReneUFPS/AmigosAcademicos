require("../config");
const express = require("express");
const app = express();
const morgan = require("morgan");
const hbs = require("express-handlebars");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const router = require("./routes");
const mongoose = require("mongoose");

app.engine(
    "hbs",
    hbs({
        extname: "hbs",
        defaultLayout: "layout",
        layoutsDir: path.join(__dirname, "/views", "/layouts"),
    })
);

mongoose
    .connect("mongodb://localhost/academicosdb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((db) => {
        console.log("db is connected");
    })
    .catch((err) => {
        console.log(err);
    });

app.set("port", process.env.PORT);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(morgan(process.env.NODE_ENV));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: process.env.SECRET_SESSION,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.listen(app.get("port"), () => {
    console.log(`listen on port ${app.get("port")}`);
});
