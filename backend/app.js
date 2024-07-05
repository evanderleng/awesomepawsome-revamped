const express = require("express");
const dotenv = require("dotenv");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const cors = require("cors");
const connDB = require("./db");
const schedule = require('node-schedule');
const fse = require('fs-extra');

const UserRouter = require("./routes/UserRoutes.js")
const ProductRouter = require("./routes/ProductRoutes.js")
const OrderRouter = require("./routes/OrderRoutes.js")
const ReviewRouter = require("./routes/ReviewRoutes.js")
const CartRouter = require("./routes/CartRoutes.js")

const EmailRouter = require("./routes/EmailRoutes.js")

dotenv.config()
connDB()
const { checktmp } = require("./middleware/imageMiddleware.js");

checktmp(); //check tmp folder exists
dotenv.config();
connDB();
const app = express();

if (process.env.NODE_ENV == "development") {
  app.use(cors({
    origin: 'http://127.0.0.1:5173',
    credentials: true
  }));
  console.log("development mode detected. CORS enabled, use http://127.0.0.1:5173 to access");
} else {
  app.use(helmet({
    accessControlAllowOrigin: 'awesome-pawsome-frontend', //untested
    accessControlAllowCredentials: true //untested
  }))
  console.log("production mode detected. CORS enabled.");
}

app.use(express.json());
app.use(mongoSanitize());

app.set('trust proxy', 1); // Trust first proxy, for NGINX

const job = schedule.scheduleJob('*/15 * * * *', () => { // At every 15th minute
  fse.emptyDirSync("./tmp");
  console.log("Deleted tmp folder contents.")
});




// logging purposes, delete before submission
app.use((req, res, next) => {
  console.log("Received request body:", req.body);
  next();
});

app.use("/api/user", UserRouter);
app.use("/api/product", ProductRouter);
app.use("/api/order", OrderRouter);
app.use("/api/review", ReviewRouter);
app.use("/api/cart", CartRouter);
app.use("/api/email", EmailRouter);

// Server Listening Port
app.listen(4000, () => {
  console.log("Server started on port 4000");
});
