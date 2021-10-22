const { check, validationResult } = require('express-validator');

module.exports = [
    check('name').isString().isLength({ min: 3 }).withMessage('Name should be at least 3 chars long').notEmpty(),
    check('category').isString().isLength({ min: 3 }).withMessage('Category should be at least 7 chars long').notEmpty(),
    check('stock').default(0).isInt().toInt().withMessage('Invalid product ID'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.mapped() });
        return next();
    }
];