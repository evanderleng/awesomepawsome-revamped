const speakeasy = require('speakeasy')

const generateOTP = (secret) => {
    const token = speakeasy.totp({
        secret: secret,
        encoding: 'base32',
        step: 180,
        algorithm: 'sha512',
    });
    return token;
};

const verifyOTP = (secret, token) => {
    const verified = speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token,
        step: 180,
        algorithm: 'sha512',
        window: 1 // Allows 1 time step before and after the current time step for validation
    });
    return verified;
};
module.exports = { generateOTP, verifyOTP };