const { check, validationResult } = require('express-validator');

module.exports = [
    check('first_name').isString().isLength({ min: 2 }).withMessage('First name should be at least 2 chars long').optional(),
    check('last_name').isString().isLength({ min: 2 }).withMessage('Last name should be at least 2 chars long').optional(),
    check('alias').isString().isLength({ min: 3 }).withMessage('Alias should be at least 3 chars long').optional(),
    check('email').isEmail().withMessage('Invalid Email').optional(),
    check('password').isString().isStrongPassword().isLength({ min: 8 }).withMessage('Password should be at least 8 chars long').optional(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.mapped() });
        return next();
    }
];

