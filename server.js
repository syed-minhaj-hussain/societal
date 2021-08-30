const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const { startConnection } = require("./db.connect");
const { router: loginRouter } = require("./routes/login.router");
const { router: registerRouter } = require("./routes/register.router");
const { router: usersRouter } = require("./routes/users.router");
const { router: postRouter } = require("./routes/post.router");

startConnection();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/users", usersRouter);
app.use("/post", postRouter);

app.listen(PORT, () => console.log("server started at PORT :", PORT));
