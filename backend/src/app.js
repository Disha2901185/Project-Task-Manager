const express = require("express");
const connectDB = require("./config/database");
const { User } = require("./models/user");
const validator = require("validator");
const validateUser = require("../middlewares/zodValidators/ValidateUser");
const {
  validationSignupData,
} = require("../middlewares/normalValidators/validation");
require("./config/database");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { default: errorMap } = require("zod/locales/en.js");
const app = express();
const PORT = 3001;
require("dotenv").config();

const jwt = require("jsonwebtoken");
const { userAuth } = require("../middlewares/auth");
const cookieParser = require("cookie-parser");
const { authRouter } = require("../routes/authRoutes");
const profileRouter = require("../routes/profile.routes");
const projectRouter = require("../routes/project.routes");
const taskRouter = require("../routes/tasks.routes");
// const requestRouter = require("../routes/request.routes");
// const { userRouter } = require("../routes/userRoutes");

app.use(
  cors({
    origin: "http://localhost:5173", // replace with your frontend URL
    credentials: true, // allow cookies to be sent
  })
);
app.use(express.json());
app.use(cookieParser());
connectDB()
  .then(() => {
    console.log("Database Connection Established.......");
    app.listen(PORT, () => {
      console.log(`Server is listening on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database Cannot be connected", err);
  });

//Routes

app.use("/", authRouter);
app.use("/profile", profileRouter);
app.use("/project",userAuth, projectRouter);
app.use("/task",userAuth, taskRouter);
// app.use("/", requestRouter);
// app.use("/user", userRouter);
