const Subscription = require('../models/Subscription');
const User = require('../models/User');

class SubscriptionController {
    // Get all subscriptions
    async getAllSubscriptions(req, res) {
        try {
            const subscriptions = await Subscription.findAll();
            return res.status(200).json(subscriptions);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching subscriptions.', error });
        }
    }

    // Subscribe to a plan
    async subscribe(req, res) {
        const userId = req.user.id;
        const { subscriptionId } = req.body;

        try {
            const subscription = await Subscription.findByPk(subscriptionId);
            if (!subscription) {
                return res.status(404).json({ message: 'Subscription not found.' });
            }

            // Update user's subscription status and expiry
            const subscriptionExpiry = new Date();
            subscriptionExpiry.setDate(subscriptionExpiry.getDate() + subscription.validityPeriod);

            await User.update({
                subscriptionStatus: 'active',
                subscriptionExpiry,
            }, { where: { id: userId } });

            return res.status(200).json({ message: 'Subscribed successfully.', subscription });
        } catch (error) {
            return res.status(500).json({ message: 'Error subscribing to plan.', error });
        }
    }
}

module.exports = new SubscriptionController();
