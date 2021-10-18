const {DataTypes} = require('sequelize');
const db = require('../config/connectDB');

const UserType = db.define('user_type', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_role: {
        type: DataTypes.STRING
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
});

module.exports = UserType;