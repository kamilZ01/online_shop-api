const bookshelf = require('../config/bookshelf');

const Category = bookshelf.Model.extend({
    tableName: 'category'
})

module.exports = bookshelf.model('Category', Category);

module.exports.getAll = () =>{
    return Category.fetchAll();
}