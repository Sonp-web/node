const { nanoid } = require("nanoid");
const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

let users = [];

function logger(req, res, next) {
  console.log(`Запрос на ${req.url}`);
  next();
}

app.use(logger);

app.get("/api/hello", (req, res) => {
  res.send("Привет, Redev!");
});
app.post("/api/echo", (req, res) => {
  res.send(req.body.message);
});
app.post("/api/users", (req, res) => {
  users.push({ id: nanoid(), ...req.body });
  res.send(users[users.length - 1]);
});
app.get("/api/users", (req, res) => {
  res.send(users);
});
app.get("/api/users/:id", (req, res) => {
  const user = users.find((item) => item.id == req.params.id);
  res.send(user);
});
app.put("/api/users/:id", (req, res) => {
  const user = users.find((item) => item.id === req.params.id);
  user.username = req.body.username;
  user.email = req.body.email;
  user.password = req.body.password;
  res.send(user);
});
app.patch("/api/users/:id", (req, res) => {
  const user = users.find((item) => item.id === req.params.id);
  user.password = req.body.password;
  res.send(user);
});
app.delete("/api/users/:id", (req, res) => {
  const userIndex = users.indexOf((item) => item.id === req.params.id);
  users.splice(userIndex, 1);
  res.send(users);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("ready on ", PORT);
});
