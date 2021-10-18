const { DataTypes } = require('sequelize');
const db = require('../config/connectDB');

const Products = db.define('products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category: {
        type: DataTypes.TEXT
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    stock:{
        type: DataTypes.INTEGER.UNSIGNED
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
});

module.exports = Products;