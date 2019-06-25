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
            products : productsClean
        });
    });
});

module.exports = router;