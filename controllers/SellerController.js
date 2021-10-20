const UserType = require("../models/UserType");
const Seller = require('../models/Sellers');
const Product = require('../models/Products');
const Post = require('../models/Posts');

const JWT = require('../models/JWT');
const bcrypt = require('bcrypt');

class SellerController {

    async showAll(req, res) {
        try {
            const seller = await Seller.findAll();
            if (seller) {
                return res.status(200).json(seller);
            }
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    async showOne(req, res) {
        try {
            const seller = await Seller.findOne({ where: { id: req.params.id } });
            if (seller) {
                return res.status(200).json(seller);
            }
            return res.status(400).json({ message: 'Not found!' });
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    async login(req, res) {
        try {
            const data = req.body;
            const seller = await Seller.findOne({ where: { email: req.body.email } });
            if (seller) {
                const findUserType = await UserType.findOne({ where: { id: seller.id }});
                const validPassword = await bcrypt.compare(data.password, seller.password);
                if (!validPassword)
                    return res.status(406).send('invalid login');
                const checkToken = await JWT.findOne({ where: { user_id: findUserType.id } });
                if (checkToken) {
                    checkToken.login();
                    return res.header('x-auth-token', checkToken.token).status(200).json({ message: 'Logged in successfully!', seller: seller, token: checkToken.token });
                }
                const token = findUserType.generateToken();
                const genToken = { user_id: findUserType.id, token: token };
                await JWT.create(genToken);
                return res.header('x-auth-token', token).status(200).json({ message: 'Logged in successfully!', seller: seller, token: token });
            }
            return res.status(400).json({ message: 'Invalid email or password' });
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    async createPost(req, res) {
        try {
            const data = req.body;
            data.rating = 0.0;
            const product = await Product.findOne({where: {id: data.product_id}});
            if (product) {
                await Post.create(data);
                const query = await Product.update({ stock: (product.stock + data.quantity) }, {where: {id: product.id}});
                if (query)
                    return res.status(200).json({ message: 'post created' });
                else
                    return res.status(400).json({ message: 'Sometheing went wrong!' });
            }
            return res.status(400).json({ message: 'invalid product' });
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    async updateSeller(req, res) {
        try {
            const data = req.body;
            const seller = await Seller.update(data, { where: { id: req.params.id } });
            if (seller) {
                return res.status(200).json({ message: 'Seller Updated Successfully' });
            }
            return res.status(400).json({ message: 'Seller not found' });
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    async updatePost(req, res) {
        try {
            const data = req.body;
            const product = await Product.findOne({ where: { id: data.product_id } });
            if (product) {
                const query = await Post.update(data, { where: { id: data.id } });
                if (query) {
                    return res.status(200).json({ message: 'post updated' });
                }
                return res.status(400).json({ message: 'post not found!' });
            }
            return res.status(400).json({ message: 'invalid product' });
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    async destroyPost(req, res) {
        try {
            const post = await Order.destroy({ where: { id: req.params.id } });
            if (query) {
                return res.status(200).json({ message: 'Order has been deleted successfully' });
            }
            return res.status(400).json({ message: 'Order not found!' });
        } catch (err) {
            return res.status(400).json(err);
        }
    }
}

module.exports = new SellerController();