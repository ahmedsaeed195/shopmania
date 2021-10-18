const UserType = require("../models/UserType");
const Customer = require('../models/Customers');
const Seller = require('../models/Sellers');
const bcrypt = require('bcrypt');

class SignUpController {
    async registerCustomer(req, res) {
        try {
            const data = req.body;
            const isUnique = await Customer.findOne({ where: { email: data.email } });
            if (!isUnique) {
                const salt = await bcrypt.genSalt(10);
                data.password = await bcrypt.hash(data.password, salt);
                const newUser = await UserType.create({ user_role: "customer" });
                data.id = newUser.id;
                const newCustomer = await Customer.create(data);
                return res.status(200).json({ message: 'SUCCESS!!', newCustomer });
            }
            return res.status(401).json({message: 'Email must be unique'});
        }
        catch (err) {
            return res.status(400).json(err);
        }
    }
    async registerSeller(req, res) {
        try {
            const data = req.body;
            const notUnique = await Seller.findOne({ where: { email: data.email } });
            if (!notUnique) {
                const salt = await bcrypt.genSalt(10);
                data.password = await bcrypt.hash(data.password, salt);
                const newUser = await UserType.create({ user_role: "seller" });
                data.id = newUser.id;
                const newSeller = await Seller.create(data);
                return res.status(200).json({ message: 'SUCCESS!!', newSeller });
            }
            return res.status(400).json({message: 'Email must be unique'});
        }
        catch (err) {
            res.status(400).send(err);
        }
    }
}

module.exports = new SignUpController();