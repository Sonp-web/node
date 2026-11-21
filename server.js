const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hi");
});

app.post("/set", (req, res) => {
  console.log(req.body);
  res.send("post");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("ready on ", PORT);
});
