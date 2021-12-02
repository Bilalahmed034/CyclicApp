const db = require("../../models");
const Venue = db.venue;
const GalleryImageType = db.galleryImageType;
const GalleryImage = db.galleryImages;
const Review = db.reveiw;
const User = db.user;
const FavoriteVenue = db.favoriteVenue;
const Category = db.category;
const Checkin = db.checkin;


var createVenue = (req, res) => {

    var galleryImageTypes = req.body?.galleryImageTypes;
    delete req.body?.galleryImageTypes;
    req.body.userId = req.authUser.id;
    Venue.create(req.body).then((venue) => {
        var data = venue.dataValues;
        if (galleryImageTypes && galleryImageTypes.length > 0) {
            galleryImageTypes.forEach(async galleryImageType => {
                var gip = await GalleryImageType.create({
                    venueId: data.id,
                    title: galleryImageType.title
                });
                console.log(gip.id , ' gip id')
                var galleryImagesData = [];
                galleryImageType?.images.forEach((image) => {
                    galleryImagesData.push({ venueId: data.id, galleryImageTypeId: gip.id, image: image })
                })
                await GalleryImage.bulkCreate(galleryImagesData);
            });
            res.status(200).send({
                status: true,
                message: 'Venue created succussflly with gallery images',
                data
            });
        } else {
            res.status(200).send({
                status: true,
                message: 'Venue created succussflly without gallery images',
                data
            })
        }
    }).catch(error => res.status(500).send({ status: false, error }));

}

var updateVenue = (req, res) => {
    var { venueId } = req.params
    var galleryImageTypes = req.body?.galleryImageTypes;
    delete req.body?.galleryImageTypes;
    req.body.userId = req.authUser.id;
    Venue.findOne(
        {
            where: {
                id: venueId
            }
        }
    ).then((v) => {
        v.update(req.body).then(async (venue) => {
            var data = venue.dataValues;
            if (galleryImageTypes && galleryImageTypes.length > 0) {
                await GalleryImage.destroy({
                    where: {
                        venueId: v.id
                    }
                })
                await GalleryImageType.destroy({
                    where: {
                        venueId: v.id
                    }
                })
                galleryImageTypes.forEach(async galleryImageType => {
                    var gip = await GalleryImageType.create({
                        venueId: data.id,
                        title: galleryImageType.title
                    });
                    console.log(gip.id , ' gip id')
                    var galleryImagesData = [];
                    galleryImageType?.images.forEach((image) => {
                        galleryImagesData.push({ venueId: data.id, galleryImageTypeId: gip.id, image: image })
                    })
                    await GalleryImage.bulkCreate(galleryImagesData);
                });
                res.status(200).send({
                    status: true,
                    message: 'Venue updated succussflly with gallery images',
                    data
                });
            } else {
                res.status(200).send({
                    status: true,
                    message: 'Venue updated succussflly without gallery images',
                    data
                })
            }
        }).catch(error => res.status(500).send({ status: false, error }));
    })

}

var allVenues = async (req, res) => {
    try {
       var data = await Venue.findAll(
            {
                include: [
                    {
                        model: User
                    },
                    {
                        model: Category
                    },
                    {
                        model: GalleryImageType,
                        include:[GalleryImage]
                    },
                    {
                        model: Review,
                        include: [User]
                    },
                    {
                        model: Checkin,
                        include:[User]
                    }
                ]
            }
        )
        res.status(200).send({
            status: true,
            data
        })
    } catch (error) {
        res.status(500).send({ status: false, error })
    }
}

var userVenues = (req, res) => {
    Venue.findAll({
        where: {
            userId: req.authUser.id
        },
        include: [
            {
                model: Category
            },
            {
                model: GalleryImageType,
                include:[GalleryImage]
            },
            {
                model: Review,
                include: [User]
            },
            {
                model: Checkin,
                include:[User]
            }
        ]
    }).then((data) => {
        res.status(200).send({
            status: true,
            data
        })
    }).catch(error => res.status(500).send({ status: false, error }));
}

var deleteVenue = (req, res) => {
    var { venueId } = req.params;
    Venue.destroy({
        where: {
            id: venueId
        }
    }).then((data) => {
        res.status(200).send({
            status: true,
            message: data + ' venues deleted successfully!'
        })
    }).catch(error => res.status(500).send({ status: false, error }));

}

var addFavoriteVenue = async (req, res) => {
    var alreadyFavoriteVenue = await FavoriteVenue.findOne({
        where: {
            userId: req.authUser.id,
            venueId: req.body.venueId
        }
    })
    if (alreadyFavoriteVenue) {
        FavoriteVenue.destroy({
            where: {
                userId: req.authUser.id,
                venueId: req.body.venueId
            }
        }).then((data) => {
            res.status(200).send({
                status: true,
                message: 'Venue removed from favorite successfully!',
            })
        }).catch(error => res.status(500).send({ status: false, error }));

    } else {

        FavoriteVenue.create({
            userId: req.authUser.id,
            venueId: req.body.venueId
        }).then((data) => {
            res.status(200).send({
                status: true,
                message: 'venue added to favorites successfully!',
                data
            })
        }).catch(error => res.status(500).send({ status: false, error }));
    }

}
var favoriteVenues = (req, res) => {
    FavoriteVenue.findAll({
        where: {
            userId: req.authUser.id
        },
        include: [
            {
                model: Venue,
                include: [
                    {
                        model: Category
                    },
                    {
                        model: User
                    },
                    {
                        model: GalleryImageType,
                        include:[GalleryImage]
                    },
                    {
                        model: Review,
                        include: [User]
                    },
                    {
                        model: Checkin,
                        include: [User]
                    }
                ]
            }

        ]
    }).then((data) => {
        res.status(200).send({
            status: true,
            data
        })
    }).catch(error => res.status(500).send({ status: false, error }));
}

var rateVenue = (req, res) => {
    req.body.userId = req.authUser.id;
    Review.create(req.body).then(async (data) => {
        var n_rating = await Review.count({
            where: {
                venueId: req.body.venueId
            }
        });
        var sum = await Review.sum('rating', {
            where: {
                venueId: req.body.venueId
            }
        });
        console.log('total rating ', sum / n_rating)

        Venue.findOne({
            where: {
                id: req.body.venueId
            }
        }).then((venue) => {
            venue.update({
                totalRating: parseFloat(sum / n_rating)
            }).then((updatedVenue) => {
                res.status(200).send({
                    status: true,
                    data,
                    updatedVenue
                })
            }).catch(error => res.status(500).send({ status: false, error }));
        }).catch(error => res.status(500).send({ status: false, error }));

    }).catch(error => res.status(500).send({ status: false, error }));


}
module.exports = {
    createVenue,
    updateVenue,
    allVenues,
    userVenues,
    deleteVenue,
    addFavoriteVenue,
    favoriteVenues,
    rateVenue
}