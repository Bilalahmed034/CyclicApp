const db = require("../../models");
const Category = db.category;

var createUpdateCategory = (req, res) => {
    if (req.body.categoryId) {
        Category.findOne({
            where: {
                id: req.body.categoryId
            }
        }).then((category) => {
            delete req.body.categoryId
            category.update(req.body).then((data) => {
                res.status(200).send({
                    status: true,
                    message: 'category updated successfully!',
                    data
                });
            }).catch(error => res.status(500).send({ status: false, error }));
        }).catch(error => res.status(500).send({ status: false, error }));
    } else {
        Category.create(req.body).then((data) => {
            res.status(200).send({
                status: true,
                message: 'category created successfully!',
                data
            });
        }).catch(error => res.status(500).send({ status: false, error }));
    }
}

var deleteCategoires = (req, res) => {
    Category.destroy({
        where: {
            id: req.body.categoryIds
        }
    }).then((data) => {
        res.status(200).send({
            status: true,
            message: data + ' categories deleted successfully!',
        });
    }).catch(error => res.status(500).send({ status: false, error }));
}

var allCategories = (req, res) => {
    Category.findAll().then((data) => {
        res.status(200).send({
            status: true,
            data
        });
    }).catch(error => res.status(500).send({ status: false, error }));
}
module.exports = {
    createUpdateCategory,
    deleteCategoires,
    allCategories
}