const UserType = require('../models/UserType');
const Admin = require('../models/Admin');
const Customer = require('../models/Customers');
const Order = require('../models/Orders');
const Seller = require('../models/Sellers');
const Post = require('../models/Posts');
const Product = require('../models/Products');

const JWT = require('../models/JWT');
const bcrypt = require('bcrypt');

class AdminController {
    //customer controls
    async showAllCustomers(req, res) {
        try {
            const customers = await Customer.findAll();
            if (customers) {
                return res.status(200).json(customers);
            }
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    async showOneCustomer(req, res) {
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
    async destroyCustomer(req, res) {
        try {
            const query = await Customer.destroy({ where: { id: req.params.id } });
            if (query) {
                return res.status(200).json({ message: 'Customer has been deleted successfully' });
            }
            return res.status(400).json({ message: 'Customer not found!' });
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    //seller controls
    async showAllSellers(req, res) {
        try {
            const sellers = await Seller.findAll();
            if (sellers) {
                return res.status(200).json(sellers);
            }
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    async showOneSeller(req, res) {
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
    async destroySeller(req, res) {
        try {
            const query = await Customer.destroy({ where: { id: req.params.id } });
            if (query) {
                return res.status(200).json({ message: 'Order has been deleted successfully' });
            }
            return res.status(400).json({ message: 'Order not found!' });
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    //post controls
    async showAllPosts(req, res) {
        try {
            const posts = await Post.findAll();
            if (posts) {
                return res.status(200).json(posts);
            }
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    async showOnePost(req, res) {
        try {
            const post = await Post.findOne({ where: { id: req.params.id } });
            if (post) {
                return res.status(200).json(post);
            }
            return res.status(400).json({ message: 'Not found!' });
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    async updatePost(req, res) {
        try {
            const data = req.body;
            const post = await Post.findOne({ where: { id: req.params.id } });
            if (post) {
                const query = await Post.update(data, { where: { id: req.params.id} });
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
            const query = await Order.destroy({ where: { id: req.params.id } });
            if (query) {
                return res.status(200).json({ message: 'Order has been deleted successfully' });
            }
            return res.status(400).json({ message: 'Order not found!' });
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    //order controls
    async showAllOrders(req, res) {
        try {
            const orders = await Order.findAll();
            if (orders) {
                return res.status(200).json(orders);
            }
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    async showOneOrder(req, res) {
        try {
            const order = await Order.findOne({ where: { id: req.params.id } });
            if (order) {
                return res.status(200).json(order);
            }
            return res.status(400).json({ message: 'Not found!' });
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
    //admin controls
    async login(req, res) {
        try {
            const data = req.body;
            const admin = await Admin.findOne({ where: { email: req.body.email } });
            if (admin) {
                const findUserType = await UserType.findOne({ where: { id: admin.id } });
                const validPassword = await bcrypt.compare(data.password, admin.password);
                if (!validPassword)
                    return res.status(406).send('invalid login');
                const checkToken = await JWT.findOne({ where: { user_id: findUserType.id } });
                if (checkToken) {
                    checkToken.login();
                    return res.header('x-auth-token', checkToken.token).status(200).json({ message: 'Logged in successfully!', admin: admin, token: checkToken.token });
                }
                const token = findUserType.generateToken();
                const genToken = { user_id: findUserType.id, token: token };
                await JWT.create(genToken).then(value => {value.login();});
                return res.header('x-auth-token', token).status(200).json({ message: 'Logged in successfully!', admin: admin, token: token });
            }
            return res.status(400).json({ message: 'Invalid email or password' });
        } catch (err) {
            return res.status(400).json({ message: "something went wrong", error: err });
        }
    }
    //product controls for admin
    async showAllProducts(req, res) {
        try {
            const products = await Product.findAll();
            console.log(products);
            return res.status(200).json(products);
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    async showOneProduct(req, res) {
        try {
            const product = await Product.findOne({ where: { id: req.params.id } });
            if (product) {
                return res.status(200).json(product);
            }
            return res.status(400).json({ message: 'Not found!' });
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    async addProduct(req, res) {
        try {
            const data = req.body;
            const isUnique = await Product.findOne({ where: { name: data.name } });
            if (!isUnique) {
                const newProduct = await Product.create(data);
                return res.status(200).json({ message: 'SUCCESS!!', newProduct });
            }
            return res.status(401).json({ message: 'Email must be unique' });
        }
        catch (err) {
            return res.status(400).json(err);
        }
    }
    async updateProduct(req, res) {
        try {
            const data = req.body;
            const product = await Product.update(data, { where: { id: req.params.id } });
            if (product) {
                return res.status(200).json({ message: 'Product has been updated successfully!' });
            }
            return res.status(400).json({ message: 'Product not found!' });
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    async destroyProduct(req, res) {
        try {
            const query = await Product.destroy({ where: { id: req.params.id } });
            if (query) {
                return res.status(200).json({ message: 'Product has been deleted successfully' });
            }
            return res.status(400).json({ message: 'Product not found!' });
        } catch (err) {
            return res.status(400).json(err);
        }
    }

}

module.exports = new AdminController();