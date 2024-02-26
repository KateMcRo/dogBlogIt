const express = require("express");
const API = require("./API");
const cors = require("cors");

const app = express();

const PORT = 3001;

// Middleware

app.use(cors());
app.use(express.json());

// Routes
app.use("/", API);

app.listen(PORT, () => {
  console.log(`🚀 CORS-enabled web server listening on port ${PORT}`);
});
