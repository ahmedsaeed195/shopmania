const UserType = require("../models/UserType");
const Customer = require('../models/Customers');
const Seller = require('../models/Sellers');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: './config/.env' });

class SignUpController {
    async registerCustomer(req, res) {
        try {
            const data = req.body;
            const isExist = await Customer.findOne({ where: { email: data.email } });
            if (!isExist) {
                const salt = await bcrypt.genSalt(10);
                data.password = await bcrypt.hash(data.password, salt);
                const newUser = await UserType.create({ role: "customer" });
                data.id = newUser.id;
                const newCustomer = await Customer.create(data);
                return res.status(200).json({ message: 'SUCCESS!!', newCustomer });
            }
            return res.status(401).json({ message: 'Email must be unique' });
        }
        catch (err) {
            return res.status(400).json(err);
        }
    }
    async registerSeller(req, res) {
        try {
            const data = req.body;
            const isExist = await Seller.findOne({ where: { email: data.email } });
            if (!isExist) {
                const salt = await bcrypt.genSalt(10);
                data.password = await bcrypt.hash(data.password, salt);
                const newUser = await UserType.create({ role: "seller" });
                data.id = newUser.id;
                const newSeller = await Seller.create(data);
                return res.status(200).json({ message: 'SUCCESS!!', newSeller });
            }
            return res.status(400).json({ message: 'Email must be unique' });
        }
        catch (err) {
            res.status(400).send(err);
        }
    }
    async registerAdmin(req, res) {
        try {
            const data = req.body;
            const isExist = await Admin.findOne({ where: { email: data.email } });
            if (!isExist) {
                if (data.key !== process.env.SHOPMANIA_KEY)
                    return res.status(401).json({ message: "Invalid Key" });
                const salt = await bcrypt.genSalt(10);
                data.password = await bcrypt.hash(data.password, salt);
                const newUser = await UserType.create({ role: "admin" });
                data.id = newUser.id;
                const newAdmin = await Admin.create(data);
                return res.status(200).json({ message: 'SUCCESS!!', newAdmin });
            }
            return res.status(401).json({ message: 'Email must be unique' });
        }
        catch (err) {
            return res.status(400).json(err);
        }
    }
}

module.exports = new SignUpController();