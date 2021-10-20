const { DataTypes } = require('sequelize');
const db = require('../config/connectDB');
const jwt = require('jsonwebtoken');


const JWT = db.define('tokens', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    token: {
        type: DataTypes.TEXT
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    last_login: DataTypes.DATE
});

JWT.prototype.login = async function () {
    await JWT.update({last_login : Date.now()}, {where: {id: this.id}});
};

JWT.prototype.updateToken = function (user) {
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.SHOPMANIA_JWTSECRET);
    JWT.update({token: token, last_login: Date.now()}, {where: {id: this.id}});
    return token;
};

module.exports = JWT;