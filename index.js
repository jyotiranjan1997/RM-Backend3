require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connect } = require("./src/config/db");
const { userRoute } = require("./src/Routes/userRoute");
const { jobRoute } = require("./src/Routes/Job");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", userRoute);
app.use("/job", jobRoute);

app.listen(process.env.PORT || 4000, async () => {
  await connect();
  console.log("listenting...");
});
