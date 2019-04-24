import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import mongoose from 'mongoose';
import Product from './model/product'

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/products', { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully");
});

app.use('/', router);

router.route('/products').get((req, res) => {
    Product.find((err, products) => {
        if (err)
            console.log(err);
        else
            res.json(products);
    });
});

router.route('/products/:id').get((req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err)
            console.log(err);
        else
            res.json(product);
    });
});

router.route('/products/add').post((req, res) => {
    let product = new Product(req.body);
    product.save()
        .then(product => {
            res.status(200).json({ 'product': 'Product added successfully' });
        })
        .catch(err => {
            res.status(400).send('Failed to add product');
        });
});

router.route('/products/update/id').post((req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (!product)
            return next(new Error('Could not load product'))
        else {
            product.name = req.body.name;
            product.type = req.body.typr;
            product.price = req.body.price;

            product.save()
                .then(product => {
                    res.json('Product is updated');
                })
                .catch(err => {
                    res.status(400).send('Updation failed');
                });
        }
    });
});

router.route('products/delete/:id').get((req, res) => {
    Product.findByIdAndRemove({ _id: req.params.id }, (err, product) => {
        if (err)
            res.json(err);
        else
            res.json('Product deleted successfully');
    });
});

app.listen(3000, () => console.log('Express server is running on port 3000'));