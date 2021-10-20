const { check, validationResult } = require('express-validator');

module.exports = [
    check('post_id').isInt().toInt().withMessage('Invalid post ID').optional(),
    check('customer_id').isFloat().toFloat().withMessage('Invalid customer ID').optional(),
    check('quantity').isInt().toInt().withMessage('Invalid product quantity').optional(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.mapped() });
        return next();
    }
];