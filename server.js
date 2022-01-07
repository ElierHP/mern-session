const express = require("express");

const port = 5000;
const app = express();

app.get("/", (req, res) => {
  res.send("First Route");
});

app.listen(port, () => console.log(`Listening at port ${port}!`));
