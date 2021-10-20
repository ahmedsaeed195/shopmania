const { check, validationResult } = require('express-validator');

module.exports = [
    check('name').isString().isLength({ min: 2 }).withMessage('name should be at least 2 chars long').notEmpty(),
    check('email').isEmail().withMessage('Invalid Email').notEmpty(),
    check('password').isString().isStrongPassword().isLength({ min: 8 }).withMessage('Password should be at least 8 chars long').notEmpty(),
    check('key').isString().isLength({ min: 2 }).withMessage('key should be at least 2 chars long').notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.mapped() });
        return next();
    }
];