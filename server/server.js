const express = require("express");
const API = require("./API");

const app = express();

const PORT = 3001;

app.use(express.json());
app.use("/", API);

app.listen(PORT, () => {
  console.log(`🚀 Listening on port ${PORT}`);
});
