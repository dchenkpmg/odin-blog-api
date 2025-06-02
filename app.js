require("dotenv").config();

const express = require("express");
const cors = require("cors");

const adminRouter = require("./routes/admin");
const postRouter = require("./routes/post");

const app = express();

console.log("App is starting...");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

require("./config/passport");

app.use("/admin", adminRouter);
app.use("/", postRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .send("Internal Server Error. Check the console for more details.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
