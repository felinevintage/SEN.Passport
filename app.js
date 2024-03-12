var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes");
var usersRouter = require("./routes/users");
var assessRouter = require("./routes/assess");
var childRouter = require("./router/child");
var docsRouter = require("./routes/docs");
var eventsRouter = require("./routes/events");
var authRouter = require("./routes/auth");




var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/assess", assessRouter);
app.use("/child", childRouter);
app.use("/docs", docsRouter);
app.use("/events", eventsRouter);

module.exports = app;
