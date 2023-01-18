const asyncHandler = require('express-async-handler');
const { default: Order } = require('../models/orderModel');

//Method: Create new  Movies oder
//Route: POST/api/orders 
//Access: private
const addOrderItem = asyncHandler(async(req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body

    if (orderItems && orderItems.length == 0) {
        res.status(400)
        throw new Error('No order items')
        return
    }else {
        const order = new Order ({
            orderItems,
            user: req.user_.id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })
    
        const createdOrder = await order.save()
    
        res.status(201).json(createdOrder)
    }
})


//Method: Create  Movies oder by ID
//Route: GET/api/orders/:id
//Access: private
const getOrderById = asyncHandler( async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    )

    if (order) {
        res.json(order)
    }else {
        res.status(404)
        throw new Error('Order not found')
    }
})

//Method: Update  Movies oder to paid
//Route: GET/api/orders/:id/pay
//Access: private
const updateOrderToPaid = asyncHandler( async ( req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    }else {
        res.status(404)
        throw new Error('Order no found')
    }
})

//Method: Create  Movies oder to delivered
//Route: GET/api/orders/:id/delivered
//Access: private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req,params.id)

    if(order){
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    }else {
        res.status(404)
        throw new Error('Order not found')
    }
})

//Method: Get logged in user order
//Route: GET/api/orders/myorders
//Access: private
const getMyOrders = asyncHandler( async ( req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
})

//Method: Get all orders
//Route: GET/api/orders
//Access: private/admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
})

export {
    addOrderItem,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderToPaid,
    updateOrderToDelivered,
}