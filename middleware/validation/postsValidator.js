const { check, validationResult } = require('express-validator');

module.exports = [
    check('title').isString().isLength({ min: 3 }).withMessage('Title should be at least 3 chars long').notEmpty(),
    check('description').isString().isLength({ min: 7 }).withMessage('Description should be at least 7 chars long').notEmpty(),
    check('product_id').isInt().toInt().withMessage('Invalid product ID').notEmpty(),
    check('price').isFloat().toFloat().withMessage('Invalid price').notEmpty(),
    check('quantity').isInt().toInt().withMessage('Invalid product quantity').notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.mapped() });
        return next();
    }
];