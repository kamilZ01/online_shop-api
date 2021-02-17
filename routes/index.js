const express = require('express');
const router = express.Router();
const productsController = require('../controllers/ProductsController');
const categoriesController = require('../controllers/CategoriesController');
const ordersController = require('../controllers/OrdersController');

// zdefiniowanie odpowiedzi dla "strony głównej"
router.get('/', (req, res) => {
    res.json({'status':'working!'});
});

//Produkt
router.get('/products', productsController.getAll);

router.get('/products/:id', productsController.getById);

router.post('/products', productsController.store);

router.put('/products', productsController.updateById);

//Kategoria
router.get('/categories', categoriesController.getAll);

//Zamówienia
router.get('/orders', ordersController.getAll);

router.get('/orders/:id', ordersController.getById);

router.post('/orders', ordersController.store);

router.put('/orders/:id/:status', ordersController.updateStatus);

router.get('/orders/status/:id', ordersController.getOrdersByStatus);

router.get('/status', ordersController.getAllOrderStatus);

module.exports = router;
