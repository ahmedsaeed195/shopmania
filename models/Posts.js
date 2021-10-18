const { DataTypes } = require('sequelize');
const db = require('../config/connectDB');

const Posts = db.define('posts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    seller_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'sellers',
            key: 'id'
        },
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    quantity: {
        type: DataTypes.INTEGER.UNSIGNED
    },
    price: {
        type: DataTypes.FLOAT
    },
    rating: {
        type: DataTypes.FLOAT
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
});

module.exports = Posts;