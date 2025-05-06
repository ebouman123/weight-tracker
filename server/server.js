const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5173;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("build"));

const weightsRouter = require("./routes/weights.router");
app.use("/api/weights", weightsRouter);

const profilesRouter = require("./routes/profiles.router");
app.use("/api/profiles", profilesRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
