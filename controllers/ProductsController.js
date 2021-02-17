const Product = require("../models/product");
const Category = require("../models/category");
const {BadRequest, NotFound} = require('../utils/GeneralError');

exports.getAll = async (req, res, next) => {
    try {
        await Product.getAll().then(
            function (allProducts) {
                res.json(allProducts);
            }
        );
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        await Product.getById(req.params.id).then(
            function (product) {
                res.json(product);
            }
        );
    } catch (err) {
        next(err);
    }
};

exports.store = async (req, res, next) => {
    const {price, weight, description, name, category} = req.body;
    try {
        if (price <= 0 || weight <= 0) {
            throw new BadRequest('Price and weight should be positive');
        }
        if (!description || !name) {
            throw new BadRequest('Missing required fields: description or name!');
        }

        if (!await checkCategory(category)) {
            throw new BadRequest("Category doesn't exists: check if the given category exist");
        }

        await Product.create({
            'name': name,
            'description': description,
            'price': price,
            'weight': weight,
            'category': category
        }).then(function (savedProduct) {
            res.json({
                'status': 'saved!',
                'product': savedProduct,
            });
        });
    } catch (err) {
        next(err);
    }
};

exports.updateById = async (req, res, next) => {
    const {id, price, weight, description, name, category} = req.body;

    try {
        if(!await checkProductExist(id)){
            throw new NotFound("Product doesn't exist");
        }
        if (!price || !weight || !description || !name || !category) {
            throw new BadRequest('All values must be completed');
        }
        if (price <= 0 || weight <= 0) {
            throw new BadRequest('Price and weight should be positive');
        }
        if (!await checkCategory(category)) {
            throw new BadRequest("Category doesn't exist: check if the given category exist");
        }
        await Product.update(req.body).then(
            function (product) {
                res.json(product);
            }
        );
    } catch (err){
        next(err);
    }
};

let checkCategory = async (category) => {
    return await Category.where({id: category}).fetch({require: false}).then((category) =>{
        if(category != null)
            return true;
    })
}

let checkProductExist = async (product) => {
    return await Product.where({id: product}).fetch({require: false}).then((product) =>{
        if(product != null)
            return true;
    })
}

exports.checkProductExist = checkProductExist
