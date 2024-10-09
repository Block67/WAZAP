const Payment = require('../models/Payment');
const User = require('../models/User');
const Subscription = require('../models/Subscription');
class PaymentController {
    // Make a payment
    async makePayment(req, res) {
        const userId = req.user.id;
        const { subscriptionId, amount, method } = req.body;

        try {
            const subscription = await Subscription.findByPk(subscriptionId);
            if (!subscription) {
                return res.status(404).json({ message: 'Subscription not found.' });
            }

            // Create a payment record
            const payment = await Payment.create({
                userId,
                subscriptionId,
                amount,
                method,
            });

            return res.status(201).json({ message: 'Payment saved.', payment });
        } catch (error) {
            return res.status(500).json({ message: 'Error making payment.', error });
        }
    }

    // Get payment history for a user
    async getPaymentHistory(req, res) {
        const userId = req.user.id; 

        try {
            const payments = await Payment.findAll({ where: { userId } });
            return res.status(200).json(payments);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching payment history.', error });
        }
    }
}

module.exports = new PaymentController();
