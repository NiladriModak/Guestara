const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");
const { urlencoded } = require("express");
const { connectDB } = require("./Middlewares/connectDB");
const categoryRoutes = require("./Routes/categoryRoutes");
const errorMiddlewire = require("./Middlewares/error");
const app = express();

dotenv.config();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use("/api/v1", categoryRoutes);
app.use(errorMiddlewire);
//listen
app.listen(process.env.PORT, () => {
  connectDB();

  console.log("Server running at port", process.env.PORT);
});
