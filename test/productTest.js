process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
let Product = require('../controllers/models/Product.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
let index = require('../index');
let should = chai.should();


chai.use(chaiHttp);

//Before each test empty the database

describe('Product', () => {
    beforeEach((done) => { 
        Product.deleteMany({}, (err) => { 
            done();           
        });        
    });

    describe('/GET products', () => {
        it('it should GET all the products', (done) => {
            chai.request(index)
            .get('/api/products')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.products.should.be.a('array');
                res.body.products.length.should.be.eql(0);
            done();
            });
        });
    });

    describe('/POST product', () => {
        it('it should return error on POST, price required, but not sent', (done) => {
            let product = {
                name : 'Computer 2',
                available: false
            }
            chai.request(index)
            .post('/api/product')
            .send(product)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('price');
            done();
            });
        });
        it('it should successfully POST a product ', (done) => {
            let product =  {
                name : 'Computer 2',
                price : 1300,
                available: false
            }
            chai.request(index)
            .post('/api/product')
            .send(product)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.product.should.have.property('name');
                res.body.product.should.have.property('price');
                res.body.product.should.have.property('available').eql(false);
            done();
            });
        });
    });

    describe('/GET/:id product', () => {
        it('it should GET a product by the given id', (done) => {
            let newProduct = new Product({
                name : 'ComputerForTest 1',
                price : 1300,
                available: false
            });
            newProduct.save((err, product) => {
                chai.request(index)
                .get('/api/product/' + product._id)
                .send(product)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.product.should.be.a('object');
                    res.body.product.should.have.property('name');
                    res.body.product.should.have.property('price').eql(1300);
                    res.body.product.should.have.property('available').eql(false);
                done();
                });
            });
        });
    });

    describe('/DELETE/:id product', () => {
        it('it should DELETE a product', (done) => {
            let newProduct = new Product({
                name : 'TestComputer 99',
                price : 1999,
                available: true
            });
            newProduct.save((err, product) => {
                chai.request(index)
                .delete('/api/product/' + product._id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('success').eql(true);
                done();
                });
            });
        });
    });

    describe('/PUT/ product', () => {
        it('it should UPDATE a product given the id', (done) => {
            let newProduct = new Product({
                name : 'TestComputer 9191',
                price : 3100,
                available: true
            })
            newProduct.save((err, product) => {
                chai.request(index)
                .put('/api/product/')
                .send({
                    id: product._id,
                    name : 'TestComputer 9191',
                    price : 3100,
                    available: true
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                done();
                });
            });
        });
    });
});