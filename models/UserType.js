const { DataTypes } = require('sequelize');
const db = require('../config/connectDB');
const jwt = require('jsonwebtoken');

const UserType = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role: {
        type: DataTypes.STRING
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
});

UserType.prototype.generateToken = function () {
    const token = jwt.sign({ id: this.id, role: this.role }, process.env.SHOPMANIA_JWTSECRET);
    return token;
};

module.exports = UserType;