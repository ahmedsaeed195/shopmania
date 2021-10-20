const { check, validationResult } = require('express-validator');

module.exports = [
    check('email').isEmail().withMessage('Invalid Email').optional(),
    check('password').isString().withMessage('Insert Password').optional(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.mapped() });
        return next();
    }
];