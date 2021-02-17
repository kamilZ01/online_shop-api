const bookshelf = require('../config/bookshelf');

const Order = bookshelf.Model.extend({
    tableName: 'orders',
    products: function() {
        return this.belongsToMany('Product','order_quantity').withPivot(['quantity','quantity']);
    },
})

module.exports = bookshelf.model('Order', Order);

module.exports.getAll = () => {
    return Order.fetchAll({withRelated: ['products']});
}

module.exports.getById = (id) => {
    return new Order({'id': id}).fetch({withRelated: ['products']});
}

module.exports.create = (order) => {
    return new Order({
        user_name: order.userName,
        email: order.email,
        phone_number: order.phoneNumber,
        address: order.address,
        order_date: order.orderDate,
        status_id: order.status
    }).save();
}

module.exports.updateOrderStatus = (order, orderStatus) => {
    return new Order({
        id: order
    }).save({
            status_id: orderStatus
        },
        {patch: true}
    );
}

module.exports.getOrdersByStatus = (orderStatus) => {
    return Order.where('status_id', orderStatus).fetchAll();
}
