const { DataTypes } = require('sequelize');
const db = require('../config/connectDB');

const Admin = db.define('admin', {
    id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user_types',
            key: 'id'
        },
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.TEXT
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
});

module.exports = Admin;