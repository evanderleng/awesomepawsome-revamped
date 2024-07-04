
const Tokens = require('csrf')


const csrf_generator = new Tokens()
const csrf_secret = csrf_generator.secretSync()

module.exports = {csrf_generator, csrf_secret}