const Order = require("../models/order");
const OrderStatus = require("../models/orderStatus");
const OrderQuantity = require("../models/orderQuantity");
const ProductsController = require("./ProductsController")
const {BadRequest, NotFound} = require('../utils/GeneralError');
const validator = require('email-validator');

exports.getAll = async (req, res, next) => {
    try {
        await Order.getAll().then(
            function (allOrders) {
                res.json(allOrders);
            }
        );
    } catch (err) {
        next(err);
    }
}

exports.getById = async (req, res, next) => {
    try {
        await Order.getById(req.params.id).then(
            function (order) {
                res.json(order);
            }
        )
    } catch (err) {
        next(err);
    }
}

exports.store = async (req, res, next) => {
    const {userName, email, phoneNumber, address, orderDate, status, products} = req.body;

    try {
        if (!userName || !email || !phoneNumber || !address || !products) {
            throw new BadRequest('Missing required fields: userName, email phoneNumber, address or products');
        }

        if (!validator.validate(email)) {
            throw new BadRequest('Email address is invalid')
        }

        if (checkIfContainsLetters(phoneNumber)) {
            throw new BadRequest("Phone number can't contains a letters");
        }

        for (const product of JSON.parse(products)) {
            if (!await ProductsController.checkProductExist(product.id)) {
                throw new BadRequest("Product with the given id " + product.id + " doesn't exist")
            }
            if (checkIfContainsLetters(product.quantity) || product.quantity <= 0) {
                throw new BadRequest("The quantity of the product id " + product.id + " must be positive and cannot contain letters");
            }
        }

        await Order.create({
            'userName': userName,
            'email': email,
            'phoneNumber': phoneNumber,
            'address': address,
            'orderDate': orderDate,
            'status': status
        }).then(async function (savedOrder) {
                for (const product of JSON.parse(products)) {
                    await OrderQuantity.create({
                        'orderId': savedOrder.id,
                        'productId': product.id,
                        'quantity': product.quantity
                    })
                }

                await savedOrder.fetch({withRelated: ['products']}).then(
                    function (order) {
                        res.json({
                            'status': 'Order saved',
                            'order': order,
                        })
                    }
                )
            }
        );
    } catch (err) {
        next(err);
    }
}

exports.updateStatus = async (req, res, next) => {
    const {id, status} = req.params;
    const order = await getOrderObject(id);

    try {
        if (!order) {
            throw new NotFound("Order doesn't exist");
        }

        if (await getOrderStatusIdByName('CANCELLED') === order.status_id) {
            throw new BadRequest("The order is canceled! The status of the order cannot be changed");
        }

        if (await getOrderStatusIdByName('COMPLETED') === order.status_id) {
            throw new BadRequest("The order is completed! The status of the order cannot be changed");
        }

        if (await getOrderStatusIdByName("CONFIRMED") === order.status_id &&
            await getOrderStatusIdByName("NOT APPROVED") === parseInt(status)) {
            throw new BadRequest("The order is confirmed! The status of the order cannot be changed to not approved");
        }

        await Order.updateOrderStatus(id, status).then(
            function (order) {
                res.json(order);
            }
        )
    } catch (err) {
        next(err);
    }
}

exports.getOrdersByStatus = async (req, res) => {
    await Order.getOrdersByStatus(req.params.id).then(
        function (orders) {
            res.json(orders);
        }
    )
}

exports.getAllOrderStatus = async (req, res) => {
    await OrderStatus.getAll().then(
        function (allOrderStatus) {
            res.json(allOrderStatus);
        });
}

let checkIfContainsLetters = (str) => {
    return str.length > 0 && str.match(/[a-zA-Z]/g);
}

let getOrderObject = async (order) => {
    return await Order.where({id: order}).fetch({require: false}).then((order) => {
        if (order != null)
            return order.toJSON();
    })
}

let getOrderStatusIdByName = async (statusName) => {
    return await OrderStatus.where({name: statusName}).fetch({require: false}).then((status) => {
        if (status != null)
            return status.id;
    })
}