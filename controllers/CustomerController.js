const Customer = require('../models/Customers');
const Order = require('../models/Orders');
const Post = require('../models/Posts');
const Product = require('../models/Products');
const bcrypt = require('bcrypt');

class CustomerController {

    async showAll(req, res) {
        try {
            const customer = await Customer.findAll();
            if (customer) {
                return res.status(200).json(customer);
            }
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    async showOne(req, res) {
        try {
            const customer = await Customer.findOne({ where: { id: req.params.id } });
            if (customer) {
                return res.status(200).json(customer);
            }
            return res.status(400).json({ message: 'Not found!' });
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    async login(req, res) {
        try {
            const data = req.body;
            const customer = await Customer.findOne({ where: { email: req.body.email } });
            if (customer) {
                const validPassword = await bcrypt.compare(data.password, customer.password);
                if (!validPassword)
                    return res.status(406).send('invalid login');
                return res.status(200).json([{ message: 'Logged in successfully!' }, customer]);
            }
            return res.status(400).json({ message: 'Invalid email or password' });
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    async makeOrder(req, res) {
        try {
            const data = req.body;
            await Order.Create(data);
            const post = await Post.findOne({ where: { id: data.post_id } });
            const query1 = await Post.update({ quantity: post.quantity - data.quantity }, { where: { id: data.post_id } });
            const product = await Product.findOne({where: {id: post.product_id}});
            const query2 = await Product.update({ quantity: product.stock - data.quantity }, { where: { id: post.product_id } });
            if (query1 && query2) {
                return res.status(200).json({ message: 'Order created' });
            }
            return res.status(400).json({ message: 'Invalid order' });
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    async updateCustomer(req, res) {
        try {
            const data = req.body;
            const customer = await Customer.update(data, { where: { id: req.params.id } });
            if (customer) {
                return res.status(200).json({ message: 'Customer Updated Successfully' });
            }
            return res.status(400).json({ message: 'Customer not found' });
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    async updateOrder(req, res) {
        try {
            const data = req.body;
            const order = await Order.update(data, { where: { id: req.params.id } });
            if (order) {
                return res.status(200).json({ message: 'Order has been updated successfully!' });
            }
            return res.status(400).json({ message: 'Order not found!' });
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    async destroyOrder(req, res) {
        try {
            const query = await Order.destroy({ where: { id: req.params.id } });
            if (query) {
                return res.status(200).json({ message: 'Order has been deleted successfully' });
            }
            return res.status(400).json({ message: 'Order not found!' });
        } catch (err) {
            return res.status(400).json(err);
        }
    }
}

module.exports = new CustomerController();