require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const routes = require("./routes/routes");
const paymentRoutes = require("./routes/payment");

const app = express();
app.use(express.json());
// app.use(cors());
const allowedOrigins = [
  "https://igot-coursera-noem.vercel.app/",
  "http://localhost:3000",
];

// Configure CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.use(bodyParser.json());
mongoose.connect(mongoString);
const database = mongoose.connection;

app.use("/api", routes);
app.use("/payment", paymentRoutes);

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
