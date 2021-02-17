const Category = require("../models/category");

exports.getAll = async (req, res, next) => {
    try {
        await Category.getAll().then(
            function (allCategories) {
                res.json(allCategories);
            }
        );
    } catch (err) {
        next(err);
    }
}