const bookshelf = require('../config/bookshelf');

const Product = bookshelf.Model.extend({
    tableName: 'product'
})

module.exports = bookshelf.model('Product', Product);

module.exports.getAll = () => {
    return Product.fetchAll();
}

module.exports.getById = (id) => {
    return new Product({'id': id}).fetch();
}

module.exports.create = (product) => {
    return new Product({
        name: product.name,
        description: product.description,
        unit_price: product.price,
        unit_weight: product.weight,
        category_id: product.category
    }).save();
}

module.exports.update = (product) => {
    return new Product({
        id: product.id
    }).save({
            name: product.name,
            description: product.description,
            unit_price: product.price,
            unit_weight: product.weight,
            category_id: product.category
        },
        {patch: true}
    );
}


