
const express = require('express');
const router = express.Router();
const { getProducts, newProduct , getSingleProduct , updateProduct , deleteProduct} = require('../controllers/productController');

// const {isAuthenticatedUser , authorizeRoles } = require('../middlewares/auth');


router.route('/products').get(   getProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/new').post( newProduct);
router.route('/admin/product/:id').put(updateProduct).delete(  deleteProduct);
// router.route('/admin/product/:id').delete(deleteProduct);

module.exports = router;