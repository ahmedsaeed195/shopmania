const jwt = require('jsonwebtoken');
const JWT = require('../../models/JWT');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token)
        return res.status(401).send('Access denied. No token provided');
    try {
        const decoded = jwt.verify(token, process.env.SHOPMANIA_JWTSECRET);
        console.log(decoded);
        if (decoded.role === 'admin') {
            req.admin = decoded;
            return next();
        }
        return res.status(401).send('Not Authorized');

    }
    catch (ex) {
        res.status(400).send('Invalid token');
    }
};