const { check, validationResult } = require('express-validator');

module.exports = [
    check('first_name').isString().isLength({ min: 2 }).withMessage('First name should be at least 2 chars long').notEmpty(),
    check('last_name').isString().isLength({ min: 2 }).withMessage('Last name should be at least 2 chars long').notEmpty(),
    check('email').isEmail().withMessage('Invalid Email').notEmpty(),
    check('password').isString().isStrongPassword().isLength({ min: 8 }).withMessage('Password should be at least 8 chars long').notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.mapped() });
        return next();
    }
];