

const Validator = require('validatorjs')


const usernameRegex = /^[\w\d]+$/g //alphanumeric + underscore only, at least 1 char
const usernameReq = "Username can only contain alphabets, digits and underscores"

const moneyRegex = /^\d+(?:\.\d{2})?$/g
const moneyReq = "Currency is not valid"

const ratingRegex = /^[1-5]$/g
const ratingReq = "Rating must be between 1-5"

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.* )[a-zA-Z\d\W]{8,}$/g //8+ character, must have 1 lower 1 upper 1 number 1 symbol no space
const passwordReq = "Password must be at least 8 characters and contain one uppercase, lowercase, digit and symbol"



Validator.register('usernameRule', input => usernameRegex.test(input), usernameReq)
Validator.register('moneyRule', input => moneyRegex.test(input), moneyReq)
Validator.register('ratingRule', input => ratingRegex.test(input), ratingReq)
Validator.register('passwordRule', input => passwordRegex.test(input), passwordReq)



module.exports = {Validator}