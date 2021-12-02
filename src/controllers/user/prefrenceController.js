const db = require("../../models");
const Prefrence = db.prefrence;
const Interest = db.interest;


var createUpdatePrefrences = (req, res) => {
    var prefrenceData = [];
    if (req.body.interestIds) {
        Prefrence.destroy({
            where: {
                userId: req.authUser.id
            }
        });
        if (req.body.interestIds.length > 0) {
            req.body.interestIds.forEach(interestId => {
                prefrenceData.push({ userId: req.authUser.id, interestId })
            });
            Prefrence.bulkCreate(prefrenceData).then((data) => {
                res.status(200).send({
                    status: true,
                    data
                });
            }).catch(error => res.status(500).send({ status: false, error }));
        } else {
            res.status(200).send({
                status: true,
                message: 'We are sorry you removed all your prefrences'
            });
        }
    }
}


var userPrefrences = (req, res) => {
    Prefrence.findAll({
        where: {
            userId: req.authUser.id
        },
        include: [
            { model: Interest }
        ]
    }).then((data) => {
        res.status(200).send({
            status: true,
            data
        });
    }).catch(error => res.status(500).send({ status: false, error }));
}
module.exports = {
    createUpdatePrefrences,
    userPrefrences
}