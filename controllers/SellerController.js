const Seller = require('../models/Sellers');
const Product = require('../models/Products');
const Post = require('../models/Posts');

class SellerController {

    async showAll() {
        try {
            const seller = await Seller.findAll();
            if (seller) {
                return res.status(200).json(seller);
            }
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    async showOne() {
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
    async login() {
        try {
            const data = req.body;
            const seller = await Seller.findOne({ where: { email: req.body.email } });
            if (customer) {
                const validPassword = await bcrypt.compare(data.password, seller.password);
                if (!validPassword)
                    return res.status(406).send('invalid login');
                return res.status(200).json([{ message: 'Logged in successfully!' }, seller]);
            }
            return res.status(400).json({ message: 'Invalid email or password' });
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    async createPost() {
        try {
            const data = req.body;
            const product = await Product.findOne({ where: { id: data.product_id } });
            if (product) {
                await Post.create(data);
                return res.status(200).json({ message: 'post created' });
            }
            return res.status(400).json({ message: 'invalid product' });
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    async updateSeller() {
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
    async updatePost() {
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
    async destroyPost() {
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