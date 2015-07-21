var express = require('express');
var router = express.Router();
var model = require('../models');
var Products = model.Products;

/* Search products. */
router.get('/find', function(req, res, next) {
	Products.findAll()
	.then(function(products) {
		console.log(JSON.stringify(products));
		res.json(products);
	})
	.catch(function(error) {
		console.log('Erro: ' + error);
	});
    //res.json({sku : '4321', product_name : 'PLAYSTATION 4', stock: 10, price : 299.00});
});

router.post('/add', function(req, res) {
	var product = req.body;	
	Products.create(product)
	.then(function(new_product) {
		res.status(201).send('OK');	
	})
	.catch(function(err) {
		res.status(500).send('Deu ruim: ' + err);
	})	
});

router.delete('/delete/:id', function(req, res) {
	console.log('AAAAAAA');
	Products.findById(req.params.id)
	.then(function(product) {
		product.destroy()
		.then(function() {
			res.status(200).send('OK');
		});
	})
	.catch(function(err) {
		res.status(500).send('Deu ruim: ' + err);
	});
});

module.exports = router;
