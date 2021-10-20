const jwt = require('jsonwebtoken');
const JWT = require('../../models/JWT');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token)
        res.status(401).send('Access denied. No token provided');

    try {
        const decoded = jwt.verify(token, process.env.SHOPMANIA_JWTSECRET);
        if (decoded.role === 'customer') {
            req.customer = decoded;
            return next();
        }
        return res.status(400).send('Not Authorized');

    }
    catch (ex) {
        return res.status(400).send('Invalid token');
    }
};