// config inicial
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// config para ler JSON (com middlewares)
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/", ({ res }) => {
  res.json({ message: "Hello, world!" });
});

const doorRoutes = require("./routes/doorRoutes");
app.use("/doors", doorRoutes);

const logRoutes = require("./routes/logRoutes");
app.use("/logs", logRoutes);

const DB_USER = "backend_ine";
const DB_PASSWORD = encodeURIComponent("M1SDHitSMaW0obNi");

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.sepu260.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectamos ao MongoDB!");
    app.listen(3000);
  }) //pra caso a conexão dê certo
  .catch((err) => console.log(err)); // pra exibir mensagem de erro, em caso de erro
