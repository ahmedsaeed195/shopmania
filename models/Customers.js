const {DataTypes} = require('sequelize');
const db = require('../config/connectDB');

const Customers = db.define('customers', {
    id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user_types',
            key: 'id'
        },
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.TEXT
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
});

module.exports = Customers;