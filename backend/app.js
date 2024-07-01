const express = require("express");
const dotenv = require("dotenv");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const cors = require("cors");
const connDB = require("./db");
const session = require('express-session');

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
  app.use(cors());
  console.log("development mode detected. CORS disabled.");
} else {
  app.use(helmet({
    accessControlAllowCredentials: true //untested
  }))
  console.log("production mode detected. CORS enabled.");
}

app.use(express.json());
app.use(mongoSanitize());
app.use(session({
  secret: 'weak_key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 1000 * 60 *60, //1hr
    httpOnly: true
  }
}));

//testing frontend backend connection works, delete before submission
app.get("/api/test", (req, res) => {
  res.json({ testing: "if you can read this, you have connected to backend" });
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
