const express = require("express");
const session = require("express-session");

const port = 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "SuperSecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.send("First Route");
});

app.get("/userSettings", (req, res) => {
  res.send(req.session.userSettings);
});

app.post("/setDarkMode", (req, res) => {
  //darkMode is True or False
  const { darkMode } = req.body;
  req.session.userSettings = { darkMode };
  res.send(req.session.userSettings);
});

app.listen(port, () => console.log(`Listening at port ${port}!`));
