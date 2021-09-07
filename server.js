const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const { startConnection } = require("./db.connect");
const { router: loginRouter } = require("./routes/login.router");
const { router: registerRouter } = require("./routes/register.router");
const { router: usersRouter } = require("./routes/users.router");
const { router: postRouter } = require("./routes/post.router");
const { router: timelineRouter } = require("./routes/timeline.router");

startConnection();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Content-Type, Authorization, Content-Length, X-Requested-With"
//     );

//     //intercepts OPTIONS method
//     if ("OPTIONS" === req.method) {
//       //respond with 200
//       res.send(200);
//     } else {
//       //move on
//       next();
//     }
//   });
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/users", usersRouter);
app.use("/post", postRouter);
app.use("/timeline", timelineRouter);
app.get("/", (req, res) => res.json({ success: true, message: "Hi" }));

app.listen(PORT, () => console.log("server started at PORT :", PORT));
