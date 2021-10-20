const { check, validationResult } = require('express-validator');

module.exports = [
    check('name').isString().isLength({ min: 3 }).withMessage('Name should be at least 3 chars long').optional(),
    check('category').isString().isLength({ min: 3 }).withMessage('Category should be at least 7 chars long').optional(),
    check('stock').isInt().toInt().withMessage('Invalid product ID').optional(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.mapped() });
        return next();
    }
];