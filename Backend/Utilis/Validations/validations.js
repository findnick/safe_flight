import { body, validationResult } from 'express-validator'

const registerValidationRules = () => {
    return [
        body('name')
            .notEmpty()
            .withMessage('Name is required')
            .isLength({ min: 2 })
            .withMessage('Name must be at least 2 characters long'),
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')
    ];
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    console.log(errors);

    return res.status(422).json({
        errors,
    });
}

export { registerValidationRules, validate }
