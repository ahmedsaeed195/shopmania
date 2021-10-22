const { check, validationResult } = require('express-validator');

module.exports = [
    check('email').isEmail().withMessage('Invalid Email').notEmpty(),
    check('password').isString().withMessage('Insert Password').notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.mapped() });
        return next();
    }
];