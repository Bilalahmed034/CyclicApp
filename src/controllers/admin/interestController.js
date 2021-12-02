const db = require("../../models");
const Interest = db.interest;

var createUpdateInterest = (req, res) => {
    if (req.body.interestId) {
        Interest.findOne({
            where: {
                id: req.body.interestId
            }
        }).then((interest) => {
            interest.update({
                interest: req.body.interest
            }).then((data) => {
                res.status(200).send({
                    status: true,
                    message: 'interest updated successfully!',
                    data
                });
            }).catch(error => res.status(500).send({ status: false, error }));
        }).catch(error => res.status(500).send({ status: false, error }));
    } else {
        Interest.create({
            interest: req.body.interest
        }).then((data) => {
            res.status(200).send({
                status: true,
                message: 'interest created successfully!',
                data
            });
        }).catch(error => res.status(500).send({ status: false, error }));
    }
}

var deleteInterests = (req, res) => {
    Interest.destroy({
        where: {
            id: req.body.interestIds
        }
    }).then((data) => {
        res.status(200).send({
            status: true,
            message: data + ' interests deleted successfully!',
        });
    }).catch(error => res.status(500).send({ status: false, error }));
}

var allInterests = (req, res) => {
    Interest.findAll().then((data) => {
        res.status(200).send({
            status: true,
            data
        });
    }).catch(error => res.status(500).send({ status: false, error }));
}
module.exports = {
    createUpdateInterest,
    deleteInterests,
    allInterests
}