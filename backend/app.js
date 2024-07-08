const express = require("express");
const dotenv = require("dotenv");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const morgan = require("morgan");
const rfs = require('rotating-file-stream');
const path = require('path');
const cors = require("cors");
const connDB = require("./db");
const schedule = require('node-schedule');
const fse = require('fs-extra');

const UserRouter = require("./routes/UserRoutes.js")
const ProductRouter = require("./routes/ProductRoutes.js")
const OrderRouter = require("./routes/OrderRoutes.js")
const ReviewRouter = require("./routes/ReviewRoutes.js")
const CartRouter = require("./routes/CartRoutes.js")
const BookRouter = require("./routes/BookRoutes.js")
const EmailRouter = require("./routes/EmailRoutes.js")

dotenv.config()
connDB()
const { checktmp } = require("./middleware/imageMiddleware.js");

checktmp(); //check tmp folder exists
dotenv.config();
connDB();
const app = express();

if (process.env.NODE_ENV == "development") {
  app.use(helmet({
    contentSecurityPolicy: { useDefaults: true },
    accessControlAllowOrigin: 'http://127.0.0.1:5173',
    accessControlAllowCredentials: true
  }))
  console.log("development mode detected. CORS enabled, use http://127.0.0.1:5173 to access");
} else {
  app.use(helmet({
    contentSecurityPolicy: { useDefaults: true },
    accessControlAllowOrigin: 'awesome-pawsome-frontend', 
    accessControlAllowCredentials: true 
  }))
  console.log("production mode detected. CORS enabled.");
}

app.use(express.json());
app.use(mongoSanitize());

var accessLogStream = rfs.createStream('access.log', {
  size: "10M", // rotate every 10 MegaBytes written
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log'),
  compress: "gzip" // compress rotated files
})
app.use(morgan('combined', { stream: accessLogStream }))


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
app.use("/api/book", BookRouter);

// Server Listening Port
app.listen(4000, () => {
  console.log("Server started on port 4000");
});
