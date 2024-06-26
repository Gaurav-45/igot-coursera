require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const routes = require("./routes/routes");
const paymentRoutes = require("./routes/payment");
const userRoutes = require("./routes/user");

const app = express();
app.use(express.json());
// app.use(cors());
const allowedOrigins = [
  "https://igot-coursera-noem-g9nfav9f5-gaurav45s-projects-5e0961d6.vercel.app",
  "http://localhost:3000",
];

const corsOptions = {
  origin: "*",
  methods: "*",
  allowedHeaders: "*",
  optionsSuccessStatus: 204,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
mongoose.connect(mongoString);
const database = mongoose.connection;

app.use("/api", routes);
app.use("/api", paymentRoutes);
app.use("/api", userRoutes);

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.listen(8000, () => {
  console.log(`Server Started at ${8000}`);
});

// Export the app for Vercel
module.exports = app;
