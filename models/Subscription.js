// models/Subscription.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Subscription = sequelize.define('Subscription', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false, // e.g., Monthly, Yearly
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    validityPeriod: {
        type: DataTypes.INTEGER,
        allowNull: false, // in days
    },
}, {
    timestamps: true,
});

module.exports = Subscription;
