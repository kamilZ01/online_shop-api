const bookshelf = require('../config/bookshelf');

const User = bookshelf.Model.extend({
    tableName: 'users',
    orders() {
        return this.hasMany('Order');
    }
})

module.exports = bookshelf.model('User', User);

module.exports.getAll = () => {
    return User.fetchAll();
}

module.exports.getByUserNameAndEmail = (userName, email) => {
    return new User({'user_name': userName, 'email': email}).fetch({require: false});
}

module.exports.create = (user) => {
    return new User({
        user_name: user.userName,
        email: user.email,
        phone_number: user.phoneNumber,
        address: user.address
    }).save();
}