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

const stripe = require('stripe')(process.env.STRIPE_SECRET);


const UserRouter = require("./routes/UserRoutes.js")
const ProductRouter = require("./routes/ProductRoutes.js")
const OrderRouter = require("./routes/OrderRoutes.js")
const Order2Router = require("./routes/Order2Routes.js")
const ReviewRouter = require("./routes/ReviewRoutes.js")
const CartRouter = require("./routes/CartRoutes.js")
const BookRouter = require("./routes/BookRoutes.js")
const EmailRouter = require("./routes/EmailRoutes.js")

//const { checktmp } = require("./middleware/imageMiddleware.js");

//checktmp(); //check tmp folder exists
dotenv.config();
connDB();
const app = express();

if (process.env.NODE_ENV == "development") {
	console.log("dev mode detected!");
} else {
	console.log("prod mode detected! We are live!");
}


// if (process.env.NODE_ENV == "development") {
app.use(cors({
	credentials: true,
	origin: 'https://awesomepawsome.shop'
}));
//   console.log("development mode detected. CORS enabled, use http://127.0.0.1:5173 to access");
// } else {
//   app.use(helmet({
//     contentSecurityPolicy: { useDefaults: true },
//     accessControlAllowOrigin: '*', 
//     accessControlAllowCredentials: true 
//   }))
//   console.log("production mode detected. CORS enabled.");
// }



const { fulfillCheckout } = require("./controllers/order2Controller.js")
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.WEBHOOK_SECRET;

app.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
	response.send()
	try {
		const sig = request.headers['stripe-signature'];
		let event;

		try {
			event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
		} catch (err) {
			console.log(err)
			response.status(400).send(`Webhook Error: ${err.message}`);
			return;
		}

		// Handle the event
		switch (event.type) {
			case 'payment_intent.succeeded':
				const paymentIntentSucceeded = event.data.object;
				// console.log("payment triggered!")
				break;

			case 'checkout.session.completed':
			case 'checkout.session.async_payment_succeeded':
				fulfillCheckout(event.data.object.id);
				break;
			default:
				// console.log(`Unhandled event type ${event.type}`);
		}

		// Return a 200 response to acknowledge receipt of the event
		response.send();
	} catch (err) {
		console.log(err)
	}
});



app.use(express.json());
app.use(mongoSanitize());

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
