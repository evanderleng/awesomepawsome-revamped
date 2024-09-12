// This test secret API key is a placeholder. Don't include personal details in requests with this key.
// To see your test secret API key embedded in code samples, sign in to your Stripe account.
// You can also find your test secret API key at https://dashboard.stripe.com/test/apikeys.
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const Product = require("../models/Product");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const mongoose = require('mongoose');
const { getProductById } = require('./productController');


const generateLineItem = async ({ id, quantity }) => {
	try {
		const product = await Product.findOne({ _id: id }); //uhh maybe check if it exists
		const lineItem = {
			price_data: {
				currency: 'sgd',
				'recurring': { "interval": "month" },
				product_data: { description: product.description, name: product.name, images: [product.imageURL], metadata: {product_id: JSON.stringify(product._id)} },
				unit_amount: product.price * 100
			},
			quantity: quantity
		}
		return lineItem

	} catch (err) {
		console.log(err)
		return 'fail'
	}
}

const createCheckoutSession = async (req, res) => {
	let { order } = req.body

	order = await Promise.all(
		order.map(item => generateLineItem({ id: item.id, quantity: item.quantity }))
	);
	// console.log(req.user._id)
	const session = await stripe.checkout.sessions.create({
		client_reference_id: req.user._id,
		ui_mode: 'embedded',
		line_items: order,
		mode: 'subscription',
		redirect_on_completion: 'never',
		automatic_tax: { enabled: false },
	});
	res.send({ clientSecret: session.client_secret });
};


const sessionStatus = async (req, res) => {
	const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

	res.send({
		status: session.status,
		customer_email: session.customer_details.email
	});
};


async function fulfillCheckout(sessionId) {
	console.log('Fulfilling Checkout Session ' + sessionId);

	// TODO: Make this function safe to run multiple times,
	// even concurrently, with the same session ID

	// TODO: Make sure fulfillment hasn't already been
	// peformed for this Checkout Session

	// Retrieve the Checkout Session from the API with line_items expanded
	const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, { expand: ['line_items'], });

	const product = await stripe.products.retrieve(checkoutSession.line_items.data[0].price.product);

	lineItemArray = checkoutSession.line_items.data;

	let order_list = []
	for (item of lineItemArray){
		prodbuffer = await stripe.products.retrieve(item.price.product)
		order_list.push( { "product_id": new mongoose.Types.ObjectId(JSON.parse(prodbuffer.metadata.product_id)), "quantity": item.quantity })
	}


	// Check the Checkout Session's payment_status property
	// to determine if fulfillment should be peformed
	if (checkoutSession.payment_status !== 'unpaid') {
		let order = await Order.create({
			user_id: checkoutSession.client_reference_id,
			order_list: order_list
		});

		let cart = await Cart.deleteOne(
			{ "user_id": checkoutSession.client_reference_id }
		)
	}
}




module.exports = { createCheckoutSession, sessionStatus, fulfillCheckout };