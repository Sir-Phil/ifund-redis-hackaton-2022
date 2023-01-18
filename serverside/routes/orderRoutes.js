const express = require('express');
const { addOrderItem, getOrders, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered } = require('../controllers/oderController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router()

router.route()

router.route('/').post(protect,addOrderItem ).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin,updateOrderToDelivered)

module.exports = router;