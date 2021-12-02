const db = require("../src/models");
const User = db.user;
const SenderOffer = db.senderOffer;
const TravelerOffer = db.travlerOffer;
// const { generate: generateToken } = require('../src/utils/token')

const stripe = require('stripe')('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');

// `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
const charge = (async (req, res) => {
    try {
        // const { generate: generateToken } = require('../utils/token')
        // const token = generateToken(req.body.offerId.id)
        console.log("reaced in payment")
        var offerData;
        var currentOfferPrice = 0;
        if (req.body.offerType == 'travelerOffer') {
            TravelerOffer.findOne({
                where: {
                    id: req.body.offerId
                },
            }).then(async (travelerOffer) => {
                offerData = travelerOffer
                console.log(offerData.offer_price+"++++++++++++++ offer price")
                currentOfferPrice = offerData.offer_price
                const session = await stripe.checkout.sessions.create({
                    success_url: 'https://viahop.net/payment-success?offerId=' + req.body.offerId + '&offerType=' + req.body.offerType,
                    cancel_url: 'https://viahop.net/payment-cancel',
                    line_items: [
                        {
                            'price_data': {
                                currency: 'usd',
                                product_data: {
                                    name: 'Payment'
                                },
                                unit_amount: currentOfferPrice * 100
                            },
                            quantity: 1
                        }
                    ],
                    mode: 'payment',
                });
                res.status(200).send({
                    status: true,
                    session: session
                })
                
            }).catch((error) => {
                res.status(200).send({
                    statu: false,
                    error: error
                })
            })

        } else if (req.body.offerType == 'senderOffer') {
            console.log("in sender offer")
            SenderOffer.findOne({
                where: {
                    id: req.body.offerId
                },
            }).then(async (senderOffer) => {
                offerData = senderOffer
                currentOfferPrice = offerData.total_cost
                console.log(offerData.offer_amount+"++++++++++++++ offer price")
                const session = await stripe.checkout.sessions.create({
                    success_url: 'https://viahop.net/payment-success?offerId=' + req.body.offerId + '&offerType=' + req.body.offerType,
                    cancel_url: 'https://viahop.net/payment-cancel',
                    line_items: [
                        {
                            'price_data': {
                                currency: 'usd',
                                product_data: {
                                    name: 'Payment'
                                },
                                unit_amount: currentOfferPrice * 100
                            },
                            quantity: 1
                        }
                    ],
                    mode: 'payment',
                });
                res.status(200).send({
                    status: true,
                    session: session
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
       
       
    } catch (error) {
        console.log(error + "=========== catch block error")
    }


});


module.exports = {
    charge
}