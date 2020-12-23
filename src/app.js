require("dotenv").config();
require("../config");
require("./database");
const path = require("path");
const express = require("express");
const app = express();
const flash = require("connect-flash");
const hbs = require("express-handlebars");
const passport = require("passport");
require("./passport");
const router = require("./routes");
const session = require("express-session");
const morgan = require("morgan");
const multer = require("multer");
const timestamp = require("./util/timeStamp");

const storage = multer.diskStorage({
    destination: path.join(__dirname, "public/images/server"),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

app.engine(
    "hbs",
    hbs({
        extname: "hbs",
        defaultLayout: "layout",
        layoutsDir: path.join(__dirname, "/views", "/layouts"),
        helpers: {
            timestamp: (date) => {
                const tmp = date.getTime();
                const { value, unit } = timestamp(tmp);
                const rtf = new Intl.RelativeTimeFormat("es", {
                    style: "short",
                });
                return rtf.format(value, unit);
            },
        },
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
    multer({
        storage,
        dest: path.join(__dirname, "public/images/server"),
        limits: { fieldSize: 2000000 },
    }).single("fotografia")
);

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
