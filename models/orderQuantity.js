const bookshelf = require('../config/bookshelf');

const OrderQuantity = bookshelf.Model.extend({
    tableName: 'order_quantity',
    idAttribute: 'order_id',
    order() {
        return this.hasOne('Order');
    },
    product() {
        return this.belongsTo('Product');
    }
})

module.exports = bookshelf.model('OrderQuantity', OrderQuantity);

module.exports.create = (orderQuantity) => {
    return new OrderQuantity({
        order_id: orderQuantity.orderId,
        product_id: orderQuantity.productId,
        quantity: orderQuantity.quantity
    }).save(null, {method: 'insert'});
}

module.exports.getProductsByOrderId = (orderId) => {
    return OrderQuantity.where('order_id', orderId).fetchAll();
}