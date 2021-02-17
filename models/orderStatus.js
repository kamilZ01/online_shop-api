const bookshelf = require('../config/bookshelf');

const OrderStatus = bookshelf.Model.extend({
    tableName: 'order_status'
})

module.exports = bookshelf.model('OrderStatus', OrderStatus);

module.exports.getAll = () => {
    return OrderStatus.fetchAll();
}

module.exports.getById = (id) => {
    return new OrderStatus({'id': id}).fetch();
}