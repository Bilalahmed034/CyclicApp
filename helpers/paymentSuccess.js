const db = require("../src/models");
const User = db.user;
const SenderOffer = db.senderOffer;
const TravelerOffer = db.travlerOffer;
const AcceptedTravelerOffer = db.acceptedTravelerOffer;
const AcceptedSenderOffer = db.acceptedSenderOffer;
const sendEmail = require('./send-email')

const paid = ((req, res) => {
    if (req.body.offerType == 'travelerOffer') {
        TravelerOffer.findOne({
            where: {
                id: req.body.offerId
            },
            include: [User, { model: AcceptedTravelerOffer, include: [User] }]

        }).then((travelerOffer) => {
            travelerOffer.update({
                payment_status: "Paid by Sender to Viahop"
            }).then(() => {
                res.status(200).send({
                    statu: true,
                    message: "Payment successfully marked in database"
                })
                if (req.body.lang == "rs") {
                    sendEmail({
                        to: travelerOffer.user.email,
                        subject: 'Offer Status Updated ',
                        html: `<html>
                    <head>
                    <title>Page Title</title>
                    <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
                    <style>
                    *{
                        font-family: ‘Open Sans’, Arial, sans-serif; ;
                    }
                    </style>
                    </head>
                    <body style="padding:30px !important">
                    
                    <h3 align="center" style="color:#F69110;">Добро пожаловать в Viahop!</h3>
                    <h4> Создан новый заказ</h4>
                    <div>Уважаемый <b>${travelerOffer.user.firstName} ${travelerOffer.user.lastName},</b></div>
                    
                    У нас есть захватывающие новости! платеж был оплачен отправителем компании Viahop за <span style="color:#F69110;font-weight:bold">#TO-${travelerOffer.id}</span>. Перейдите в свой профиль, чтобы просмотреть подробности и связаться с отправителем <a href="https://viahop.net" style="color:#F69110;font-weight:bold;text-decoration:none">Viahop</а>.
                    
                    <h6>Счастливого путешествия!</h6>
                      <h4>Команда Viahop</h5>
                    
                    
                    </body>
                    </html>
                    `
                    })
                    sendEmail({
                        to: travelerOffer.acceptedTravelerOffer.user.email,
                        subject: 'Offer Status Updated ',
                        html: `<html>
                    <head>
                    <title>Page Title</title>
                    <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
                    <style>
                    *{
                        font-family: ‘Open Sans’, Arial, sans-serif; ;
                    }
                    </style>
                    </head>
                    <body style="padding:30px !important">
                    
                    <h3 align="center" style="color:#F69110;">Добро пожаловать в Viahop!</h3>
                    <div>Уважаемый <b>${travelerOffer.acceptedTravelerOffer.user.firstName} ${travelerOffer.acceptedTravelerOffer.user.lastName},</b></div>
                    
                    У нас есть захватывающие новости! Вы оплатили <span style="color:#F69110;font-weight:bold">#TO-${travelerOffer.id}</span>. Перейдите в свой профиль, чтобы просмотреть подробности и связаться с отправителем <a href="https://viahop.net" style="color:#F69110;font-weight:bold;text-decoration:none">Viahop</a>.
                    
                    <h6>Счастливого путешествия!</h6>
                      <h4>Команда Viahop</h5>
                    
                    
                    </body>
                    </html>
                    `
                    })
                } else {
                    sendEmail({
                        to: travelerOffer.user.email,
                        subject: 'Offer Status Updated ',
                        html: `<html>
                    <head>
                    <title>Page Title</title>
                    <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
                    <style>
                    *{
                        font-family: ‘Open Sans’, Arial, sans-serif; ;
                    }
                    </style>
                    </head>
                    <body style="padding:30px !important">
                    
                    <h3 align="center" style="color:#F69110;">Welcome to Viahop!</h3>
                    <h4> New order created</h4>
                    <div>Dear <b>${travelerOffer.user.firstName} ${travelerOffer.user.lastName},</b></div>
                    
                    We've got exciting news! payment has been paid by sender to Viahop for <span style="color:#F69110;font-weight:bold">#TO-${travelerOffer.id}</span>. Head over to your profile to view the details and communicate with sender <a href="https://viahop.net" style="color:#F69110;font-weight:bold;text-decoration:none">Viahop</a>.
                    
                    <h6>Happy travelsends,</h6>
                      <h4>The Viahop Team</h5>
                    
                    
                    </body>
                    </html>
                    `
                    })
                    sendEmail({
                        to: travelerOffer.acceptedTravelerOffer.user.email,
                        subject: 'Offer Status Updated ',
                        html: `<html>
                    <head>
                    <title>Page Title</title>
                    <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
                    <style>
                    *{
                        font-family: ‘Open Sans’, Arial, sans-serif; ;
                    }
                    </style>
                    </head>
                    <body style="padding:30px !important">
                    
                    <h3 align="center" style="color:#F69110;">Welcome to Viahop!</h3>
                    <div>Dear <b>${travelerOffer.acceptedTravelerOffer.user.firstName} ${travelerOffer.acceptedTravelerOffer.user.lastName},</b></div>
                    
                    We've got exciting news! Your have paid for <span style="color:#F69110;font-weight:bold">#TO-${travelerOffer.id}</span>. Head over to your profile to view details and communicate with sender <a href="https://viahop.net" style="color:#F69110;font-weight:bold;text-decoration:none">Viahop</a>.
                    
                    <h6>Happy travelsends,</h6>
                      <h4>The Viahop Team</h5>
                    
                    
                    </body>
                    </html>
                    `
                    })
                }
            }).catch((error) => {
                res.status(200).send({
                    statu: false,
                    error: error
                })
            })
        }).catch((error) => {
            res.status(200).send({
                statu: false,
                error: error
            })
        })
    } else if (req.body.offerType == 'senderOffer') {
        SenderOffer.findOne({
            where: {
                id: req.body.offerId
            },
            include: [User, { model: AcceptedSenderOffer, include: [User] }]
        }).then((senderOffer) => {

            senderOffer.update({
                payment_status: "Paid by Sender to Viahop"
            }).then(() => {
                res.status(200).send({
                    statu: true,
                    message: "Payment successfully marked in database"
                })
                if (req.body.lang == "rs") {
                    sendEmail({
                        to: senderOffer.user.email,
                        subject: 'Offer Status Updated ',
                        html: `<html>
                    <head>
                    <title>Offer Status Updated</title>
                    <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
                    <style>
                    *{
                        font-family: ‘Open Sans’, Arial, sans-serif; ;
                    }
                    </style>
                    </head>
                    <body style="padding:30px !important">
                    
                    <h3 align="center" style="color:#F69110;">Добро пожаловать в Viahop!</h3>
                    <h4> Создан новый заказ</h4>
                    <div>Уважаемый <b>${senderOffer.user.firstName} ${senderOffer.user.lastName},</b></div>
                    
                    У нас есть захватывающие новости! Вы заплатили за <span style="color:#F69110;font-weight:bold">#SO-${senderOffer.id}</span>. Перейдите в свой профиль, чтобы просмотреть подробности и связаться с отправителем <a href="https://viahop.net" style="color:#F69110;font-weight:bold;text-decoration:none">Viahop</a>.
                    
                    <h6>Счастливого путешествия,</h6>
                      <h4>Команда Viahop</h5>
                    
                    
                    </body>
                    </html>
                    `
                    })

                    sendEmail({
                        to: senderOffer.acceptedSenderOffer.user.email,
                        subject: 'Offer Status Updated ',
                        html: `<html>
                    <head>
                    <title>Offer Status Updated</title>
                    <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
                    <style>
                    *{
                        font-family: ‘Open Sans’, Arial, sans-serif; ;
                    }
                    </style>
                    </head>
                    <body style="padding:30px !important">
                    
                    <h3 align="center" style="color:#F69110;">Добро пожаловать в Viahop!</h3>
                    <div>Уважаемый <b>${senderOffer.acceptedSenderOffer.user.firstName} ${senderOffer.acceptedSenderOffer.user.lastName},</b></div>
                    У нас есть захватывающие новости! платеж был оплачен отправителем компании Viahop за <span style="color:#F69110;font-weight:bold">#SO-${senderOffer.id}</span>. Перейдите в свой профиль, чтобы просмотреть подробности и связаться с отправителем <a href="https://viahop.net" style="color:#F69110;font-weight:bold;text-decoration:none">Viahop</а>.
                    
                    <h6>Счастливого путешествия,</h6>
                      <h4>Команда Viahop</h5>
                    
                    
                    </body>
                    </html>
                    `
                    })
                } else {
                    sendEmail({
                        to: senderOffer.user.email,
                        subject: 'Offer Status Updated ',
                        html: `<html>
                    <head>
                    <title>Offer Status Updated</title>
                    <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
                    <style>
                    *{
                        font-family: ‘Open Sans’, Arial, sans-serif; ;
                    }
                    </style>
                    </head>
                    <body style="padding:30px !important">
                    
                    <h3 align="center" style="color:#F69110;">Welcome to Viahop!</h3>
                    <h4> New order created</h4>
                    <div>Dear <b>${senderOffer.user.firstName} ${senderOffer.user.lastName},</b></div>
                    
                    We've got exciting news! Your have paid for <span style="color:#F69110;font-weight:bold">#SO-${senderOffer.id}</span>. Head over to your profile to view details and communicate with sender <a href="https://viahop.net" style="color:#F69110;font-weight:bold;text-decoration:none">Viahop</a>.
                    
                    <h6>Happy travelsends,</h6>
                      <h4>The Viahop Team</h5>
                    
                    
                    </body>
                    </html>
                    `
                    })

                    sendEmail({
                        to: senderOffer.acceptedSenderOffer.user.email,
                        subject: 'Offer Status Updated ',
                        html: `<html>
                    <head>
                    <title>Offer Status Updated</title>
                    <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
                    <style>
                    *{
                        font-family: ‘Open Sans’, Arial, sans-serif; ;
                    }
                    </style>
                    </head>
                    <body style="padding:30px !important">
                    
                    <h3 align="center" style="color:#F69110;">Welcome to Viahop!</h3>
                    <div>Dear <b>${senderOffer.acceptedSenderOffer.user.firstName} ${senderOffer.acceptedSenderOffer.user.lastName},</b></div>
                    We've got exciting news! payment has been paid by sender to Viahop for <span style="color:#F69110;font-weight:bold">#SO-${senderOffer.id}</span>. Head over to your profile to view the details and communicate with sender <a href="https://viahop.net" style="color:#F69110;font-weight:bold;text-decoration:none">Viahop</a>.
                    
                    <h6>Happy travelsends,</h6>
                      <h4>The Viahop Team</h5>
                    
                    
                    </body>
                    </html>
                    `
                    })
                }
            }).catch((error) => {
                res.status(200).send({
                    statu: false,
                    error: error
                })
            })
        }).catch((error) => {
            res.status(200).send({
                statu: false,
                error: error
            })
        })
    } else {
        res.status(200).send({
            statu: false,
            message: 'Unknow offer type'
        })
    }
})

module.exports = {
    paid
}