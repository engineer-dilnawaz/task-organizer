require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const dbConnect = require("./config/dbConnect");
const taskRouter = require("./routes/task");
const categoryRouter = require("./routes/category");
const errorHandler = require("./middlewares/errorHandler");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/", taskRouter);
app.use("/", categoryRouter);

app.use(errorHandler);

dbConnect().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
