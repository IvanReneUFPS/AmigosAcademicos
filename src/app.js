require("dotenv").config();
require("../config");
require("./database");
const http = require("http");
const socketio = require("socket.io");
const express = require("express");
const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);
require("./sockets")(io);
const flash = require("connect-flash");
const hbs = require("express-handlebars");
const morgan = require("morgan");
const path = require("path");
const passport = require("passport");
require("./passport");
const router = require("./routes");
const session = require("express-session");

app.engine(
    "hbs",
    hbs({
        extname: "hbs",
        defaultLayout: "layout",
        layoutsDir: path.join(__dirname, "/views", "/layouts"),
    })
);

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
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});
app.use(router);

app.listen(app.get("port"), () => {
    console.log(`listen on port ${app.get("port")}`);
});
