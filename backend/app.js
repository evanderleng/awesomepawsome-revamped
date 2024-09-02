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

const stripe = require('stripe')('sk_test_51PaLw5DC0HCHwtvp6ObvOpKNrqUrjOeh0UGaLuJ4VsLhGk8ItD6iUfofj0dB4bpP9iYD4UNF8sccJmiGLZ6bdUkE00smefRBiH');
const YOUR_WEBHOOK_SECRET = 'your_stripe_webhook_secret'; // Replace with your webhook secret from Stripe


const UserRouter = require("./routes/UserRoutes.js")
const ProductRouter = require("./routes/ProductRoutes.js")
const OrderRouter = require("./routes/OrderRoutes.js")
const Order2Router = require("./routes/Order2Routes.js")
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
  app.use(cors({
    credentials: true,
    //origin: 'http://127.0.0.1:5173'
  }));
  console.log("development mode detected. CORS enabled, use http://127.0.0.1:5173 to access");
} else {
  app.use(helmet({
    contentSecurityPolicy: { useDefaults: true },
    accessControlAllowOrigin: 'awesomepawsome-revamped-git-main-evanderlengs-projects.vercel.app', 
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


// app.post('/webhook', async (req, res) => {
//   const sig = req.headers['stripe-signature'];
//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, YOUR_WEBHOOK_SECRET);
//   } catch (err) {
//     console.error('Webhook Error:', err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object;
//     const paymentIntent = session.payment_intent;

//     try {
//       await executeDatabaseFunction(event); // Implement this function to handle your database operation
//       console.log('Database function executed successfully.');
//     } catch (error) {
//       console.error('Error executing database function:', error.message);
//     }
//   }
//   res.json({ received: true });
// });

// const executeDatabaseFunction = async (paymentIntentId) => {
//   console.log('Executing database function for payment intent:', paymentIntentId);
// };




// logging purposes, delete before submission
// app.use((req, res, next) => {
//   console.log("Received request body:", req.body);
//   next();
// });

app.use("/api/user", UserRouter);
app.use("/api/product", ProductRouter);
app.use("/api/order", OrderRouter);
app.use("/api/order2", Order2Router);
app.use("/api/review", ReviewRouter);
app.use("/api/cart", CartRouter);
app.use("/api/email", EmailRouter);
app.use("/api/book", BookRouter);

// Server Listening Port
app.listen(4000, () => {
  console.log("Server started on port 4000");
});
