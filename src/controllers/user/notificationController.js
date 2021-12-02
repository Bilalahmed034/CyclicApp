const db = require("../../models");

const Notification = db.notification;
const User = db.user;

var createNotification = (req, res) => {
    req.body.sentBy = req.authUser.id;
    Notification.create(req.body).then((data) => {
        res.status(200).send({
            status: true,
            data
        })
    }).catch(error => res.status(500).send({ status: false, error }))
}

var markIsRead = (req, res) => {
    Notification.update({ isRead: 1 }, {
        where: {
            id: req.body.notificationIds
        }
    }).then((data) => {
        res.status(200).send({
            status: true,
            meessage: ''+data[0] +' notifications are marked read'
        })
    }).catch(error => res.status(500).send({ status: false, error }))
}

var myNotifications = (req, res) => {
    Notification.findAll({where:{userId:req.authUser.id},include:[{model:User,as:'sender'}]}).then((data) => {
        res.status(200).send({
            status: true,
            data
        })
    }).catch(error => res.status(500).send({ status: false, error }))
}
module.exports = {
    createNotification,
    markIsRead,
    myNotifications
}