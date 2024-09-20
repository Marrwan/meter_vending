const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const db = require('../models/index');
const { generateToken, calculateUnit } = require('../utils/tokenGenerator');

// Recharge Meter Route
router.post(
    '/recharge',
    // Input validation rules
    [
        body('meterCode')
            .notEmpty()
            .withMessage('Meter Code is required')
            .isString()
            .withMessage('Meter Code must be a string'),
        body('amount')
            .notEmpty()
            .withMessage('Amount is required')
            .isNumeric()
            .withMessage('Amount must be a number'),
    ],
    async (req, res) => {
        // Validate the input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: errors.array().map(error => error.msg), // Basic error messages
            });
        }

        const { meterCode, amount } = req.body;
        const userId = process.env.USER_ID || '';
        const pwd = process.env.PWD || '';

        try {
            // Check if user already exists
            let user = await db.User.findOne({ where: { userId } });
            if (!user) {
                user = await db.User.create({ userId, pwd, meterCode });
            }

            // Autogenerate token
            const token = generateToken();

            // Calculate unit (kWh) based on amount
            const unit = calculateUnit(amount);

            // Save transaction
            const transaction = await db.Transaction.create({
                amount,
                token,
                returnCode: 1, // Assuming success for now
                returnMessage: 'Success',
                UserId: user.id,
            });

            // Send successful response
            return res.json({
                success: true,
                message: `Your token is ${token}`,
                token,
                unit,
            });
        } catch (error) {
            console.error('Error recharging meter:', error);

            // Return appropriate error response
            return res.status(500).json({
                success: false,
                message: 'Error processing request. Please try again later.',
            });
        }
    }
);

module.exports = router;

//
// // Make request to external API
// const response = await axios.post(process.env.API_URL, {
//     UserId: userId,
//     Pwd: pwd,
//     MeterCode: meterCode,
//     Amount: amount
// });
//
// const { ReturnCode, ReturnMessage, Data } = response.data;
//
// // Save transaction
// const transaction = await db.Transaction.create({
//     amount,
//     token: Data,
//     returnCode: ReturnCode,
//     returnMessage: ReturnMessage,
//     UserId: user.id
// });
//
// res.json({
//     success: ReturnCode === 1,
//     message: ReturnMessage,
//     token: Data
// });
