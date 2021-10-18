const { DataTypes } = require('sequelize');
const db = require('../config/connectDB');

const Orders = db.define('orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'posts',
            key: 'id'
        }
    },
    customer_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'customers',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    total_price: {
        type: DataTypes.FLOAT,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
});

module.exports = Orders;