const express = require("express");
const Product = require("../models/Product.js");
const router = express.Router();

//[GET] /products - as response sends a list of products

router.get("/", async (req, res) => {
    await Product.find((err, products) => {
        if (err) return res.json({ error: err });
        let productsClean = products.map((product) =>{
            return ({
                "name": product.name,
                "price": product.price,
                "available": product.available,
                "dateCreated": product.dateCreated,
            });
        });
        return res.json({
            product: productsClean
        });
    });
});

// [POST] /product

router.post("/",  async (req, res) => {
    const { name, price, available } = req.body;
    let productDetails = {
        name, 
        price,
        available,
    }
    let newProduct = new Product(productDetails);
    await newProduct.save((err, product, productDetails) => {
        produst = productDetails
        if (err) return res.send( err );
        return res.json({ 
            success: true,
            product 
        });
    });
});

//[GET] /product/:id

router.get("/:id", async(req, res) => {
    await Product.findOne({_id: req.params.id}, (err, product) => {
        if (err) return res.send(err);
        let productClean = {
            "name": product.name,
            "price": product.price,
            "available": product.available,
            "dateCreated": product.dateCreated,
        };
        return res.json({
            product: productClean
        });
    });
});

//[DELETE] /product/:id

router.delete("/:id", async(req, res) => {
    await Product.findByIdAndDelete({_id: req.params.id}, err => {
        if (err) return res.send(err);
        return res.json({ 
            success: true 
        });
    });
});

//[PUT] /product

router.put('/', async function(req, res){
    await Product.findByIdAndUpdate({_id: req.body.id}, req.body, err => {
        if (err) return res.send(err);
        //could send updated product, with another promise
        return res.json({ 
            success: true 
        });
    })
});


module.exports = router;