// This test secret API key is a placeholder. Don't include personal details in requests with this key.
// To see your test secret API key embedded in code samples, sign in to your Stripe account.
// You can also find your test secret API key at https://dashboard.stripe.com/test/apikeys.
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const Product = require("../models/Product");

const YOUR_DOMAIN = 'http://127.0.0.1:4000';


const generateLineItem = async ({id, quantity}) => {
	try {
        const product = await Product.findOne( {_id: id} );
		const lineItem = {price_data: {currency: 'sgd','recurring':{"interval": "month"}, product_data: {description: JSON.stringify(product._id), name: product.name, images: [product.imageURL]} ,unit_amount: product.price*100 }, quantity: quantity}
		console.log("lineitem created")
		console.log(lineItem)
		return lineItem

	}catch (err){
		console.log(err)
		return 'fail'
	}
}

const createCheckoutSession = async (req, res) => {
	let { order } = req.body

	order = await Promise.all(
		order.map(item => generateLineItem( {id: item.id, quantity: item.quantity} ) )
	);
	// console.log(req.user._id)
	const session = await stripe.checkout.sessions.create({
		// client_reference_id: req.user._id,
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


module.exports = { createCheckoutSession, sessionStatus};