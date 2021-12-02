const db = require("../../models");
const {
    hash: hashPassword,
    compare: comparePassword,
} = require('../../utils/password')
const { generate: generateToken } = require('../../utils/token')
const sendMessage = require('../../../helpers/send_message')
const sendEmail = require('../../../helpers/send-email')
const Support = db.support;
const Venue = db.venue;
const GalleryImageType = db.galleryImageType;
const GalleryImage = db.galleryImages;
const Review = db.reveiw;
const User = db.user;
const FavoriteVenue = db.favoriteVenue;
const Category = db.category; var ForGotPassword = db.forGotPassword;
const Location = db.location;
const Follower = db.follower;
const Prefrence = db.prefrence;
const Interest = db.interest;
const Post = db.post;
const PostComment = db.postComment;
const PostLike = db.postLike;
const Checkin = db.checkin;

var signup = (req, res) => {
    const { password } = req.body;
    const hashedPassword = hashPassword(password.trim())
    req.body.password = hashedPassword;
    User.create(req.body).then((data) => {
        User.findOne({
            where: {
                id: data.id
            }
        }).then((user) => {
            if (user) {
                var email = user.email
                var otp = Math.floor(1000 + Math.random() * 9000);
                sendEmail({
                    to: user.email,
                    subject: ' Reset Password ',
                    html: `
                    <div style="white-space:nowrap">Dear <b>${user.fullName},</b></div>
                   <p> Here's your one-time-passport (OTP) to reset your password: <span>${otp}</span></p>
                   `,
                })
                ForGotPassword.create({
                    username: email,
                    otp: otp
                }).then(() => {
                    const token = generateToken(user.id)
                    user.password = undefined;
                    res.status(200).send({
                        status: true,
                        token: token,
                        user,
                        message: "otp has been sent your email!"
                    })
                })

            }
        }).catch((error) => {
            res.status(200).send({
                status: false,
                message: "Registraton Failed",
                error
            })
        })

    }).catch((error) => {
        res.status(200).send({
            status: false,
            message: "Registraton Failed",
            error
        })
    })

}
var signin = async (req, res) => {
    const { email, password } = req.body;
    User.findOne({
        where: {
            email: email
        },
    }).then((data) => {
        var date = new Date();
        if (data) {
            data.update({
                lastLoginDate: date,
                deviceToken: req.body?.deviceToken
            }).then((user) => {
                // console.log(user.password + " _____password " + password.trim())
                if (comparePassword(password.trim(), user.password)) {
                    // console.log(user)
                    user.password = undefined;
                    user.deviceToken = req.body.deviceToken || '';
                    user.lastLoginDate = date;
                    const token = generateToken(user.id)
                    if (user.status) {
                        res.status(200).send({
                            status: true,
                            token: token,
                            user
                        })
                    } else {
                        res.status(200).send({
                            status: false,
                            message: "Your account has been suspended please contact support to get this resolved!"
                        })
                    }
                } else {
                    res.status(200).send({
                        status: false,
                        message: "password is incorrect"
                    })
                }
            }).catch((error) => {
                res.status(200).send({
                    status: false,
                    error
                })
            })
        } else {
            res.status(200).send({
                status: false,
                message: "Email does not exist!"

            })
        }
    }).catch((error) => {
        res.status(200).send({
            status: false,
            error
        })
    })

}
var socialLogin = async (req, res) => {
    try {
        let user = await User.findOne({
            where: {
                email: req.body.idOrEmail
            }
        })
        if (user) {
            user.update({
                lastLoginDate: new Date(),
                deviceToken: req.body?.deviceToken
            })
            console.log(user.id, '  user is found ')
            user.password = undefined;
            user.deviceToken = req.body.deviceToken || '';
            user.lastLoginDate = new Date();
            const token = generateToken(user.id)
            if (user.status) {
                res.status(200).send({
                    status: true,
                    token: token,
                    user
                })
            } else {
                res.status(200).send({
                    status: false,
                    message: "Your account has been suspended please contact support to get this resolved!"
                })
            }
        } else {
            req.body.email = req.body.idOrEmail;
            delete req.body.idOrEmail;
            let createUser = await User.create(req.body);
            let user = await User.findOne({ where: { id: createUser.id } })
            const token = generateToken(user.id)
            user.password = undefined;
            res.status(200).send({
                status: true,
                token: token,
                data: user,
                message: "Social signup successfull update rest of the details now"
            })
        }
    } catch (error) {
        console.log('error ' , error)
        res.status(500).send({
            status: false,
            error
        })
    }


}
var getUser = async (req, res) => {
    User.findOne(
        {
            where: { id: req.authUser.id },
            include: [
                {
                    model: Follower,
                    as: 'followers',
                    include: [
                        {
                            model: User,
                            as: 'followerData'
                        }
                    ]
                },
                {
                    model: Follower,
                    as: 'followings',
                    include: [
                        {
                            model: User,
                            as: 'followingData'
                        }
                    ]
                },
                {
                    model: Venue,
                    as: 'myVenues',
                    include: [
                        {
                            model: Category
                        },
                        {
                            model: GalleryImageType,
                            include: [GalleryImage]
                        },
                        {
                            model: Review,
                            include: [User]
                        }
                    ]
                },
                {
                    model: FavoriteVenue,
                    as: 'myFavoriteVenues',
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
                                    include: [GalleryImage]
                                },
                                {
                                    model: Review,
                                    include: [User]
                                }
                            ]
                        }

                    ]
                },
                {
                    model: Prefrence,
                    include: [Interest]
                },
                {
                    model: Location,
                },
                {
                    model: Post,
                    include: [
                        {
                            model: Venue,
                            include: [User]
                        },
                        {
                            model: PostLike,
                            include: [User]
                        },
                        {
                            model: PostComment,
                            include: [User]
                        }
                    ]
                }
            ]
        }
    ).then((data) => {
        data.password = undefined;
        res.status(200).send({
            status: true,
            data
        })
    }).catch(error => res.status(200).send({ status: false, error }))
}

var userProfile = async (req, res) => {
    var { userId } = req.params
    User.findOne(
        {
            where: { id: userId },
            include: [
                {
                    model: Follower,
                    as: 'followers',
                    include: [
                        {
                            model: User,
                            as: 'followerData'
                        }
                    ]
                },
                {
                    model: Follower,
                    as: 'followings',
                    include: [
                        {
                            model: User,
                            as: 'followingData'
                        }
                    ]
                },
                {
                    model: Venue,
                    as: 'myVenues',
                    include: [
                        {
                            model: Category
                        },
                        {
                            model: GalleryImageType,
                            include: [GalleryImage]
                        },
                        {
                            model: Review,
                            include: [User]
                        }
                    ]
                },
                {
                    model: FavoriteVenue,
                    as: 'myFavoriteVenues',
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
                                    include: [GalleryImage]
                                },
                                {
                                    model: Review,
                                    include: [User]
                                }
                            ]
                        }

                    ]
                },
                {
                    model: Prefrence,
                    include: [Interest]
                },
                {
                    model: Location,
                },
                {
                    model: Post,
                    include: [
                        {
                            model: Venue,
                            include: [User]
                        },
                        {
                            model: PostLike,
                            include: [User]
                        },
                        {
                            model: PostComment,
                            include: [User]
                        }
                    ]
                }
            ]
        }
    ).then((data) => {
        data.password = undefined;
        res.status(200).send({
            status: true,
            data
        })
    }).catch(error => res.status(200).send({ status: false, error }))
}
var updateUser = async (req, res) => {

    User.findOne({ where: { id: req.authUser.id } }).then((user) => {
        if (user) {
            user.update(req.body).then((data) => {
                data.password = undefined;
                res.status(200).send({
                    status: true,
                    data
                })
            }).catch(error => res.status(200).send({ status: false, error }))

        }
    }).catch(error => res.status(200).send({ status: false, error }))
}

var resetPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body
    User.findOne({ where: { id: req.body.id } }).then((user) => {
        if (user) {
            if (comparePassword(oldPassword.trim(), user.password)) {
                const hashedPassword = hashPassword(newPassword.trim())
                user.update({
                    password: hashedPassword
                }).then((updatedUser) => {
                    updatedUser.password = undefined;
                    res.status(200).send({
                        status: true,
                        message: "Password updated successfully!"
                    })
                }).catch(error => res.status(200).send({ status: false, error }))
            } else {
                res.status(200).send({
                    status: false,
                    message: "Password is incorrect!"
                })
            }

        }
    }).catch(error => res.status(200).send({ status: false, error }))
}

var forgotPasswordByEmailSendOtp = async (req, res) => {
    if (req.body.email) {
        ForGotPassword.findOne({
            where: {
                username: req.body.email
            }
        }).then((otpData => {
            // console.log(otpData)
            if (otpData) {
                ForGotPassword.destroy({
                    where: {
                        id: otpData.id
                    }
                }).then(() => {
                    User.findOne({
                        where: {
                            email: req.body.email
                        }
                    }).then(async (user) => {
                        if (user) {
                            var email = req.body.email
                            var otp = Math.floor(1000 + Math.random() * 9000);
                            sendEmail({
                                to: user.email,
                                subject: ' Reset Password ',
                                html: `
                                <div style="white-space:nowrap">Dear <b>${user.fullName},</b></div>
                               <p> Here's your one-time-passport (OTP) to reset your password: <span>${otp}</span></p>
                               `,
                            })
                            ForGotPassword.create({
                                username: email,
                                otp: otp
                            }).then(() => {
                                res.status(200).send({
                                    status: true,
                                    message: "otp has been sent your email!"
                                })
                            })

                        } else {
                            res.status(200).send({
                                status: true,
                                message: "Phone number not found"
                            })
                        }
                    })
                })
            } else {
                User.findOne({
                    where: {
                        email: req.body.email
                    }
                }).then(async (user) => {
                    if (user) {
                        var email = req.body.email
                        var otp = Math.floor(1000+Math.random() * 9000)
                        sendEmail({
                            to: user.email,
                            subject: ' Reset Password ',
                            html: `
                            <div style="white-space:nowrap">Dear <b>${user.firstName} ${user.lastName},</b></div>
                           <p> Here's your one-time-passport (OTP) to reset your password: <span>${otp}</span></p>
                           `,
                        })
                        ForGotPassword.create({
                            username: email,
                            otp: otp
                        }).then(() => {
                            res.status(200).send({
                                status: true,
                                message: "otp has been sent your email!"
                            })
                        })

                    } else {
                        res.status(200).send({
                            status: false,
                            message: "Phone number not found"
                        })
                    }
                })
            }

        }))
    }

}

var forgotPasswordByEmailVerifyOtp = async (req, res) => {
    ForGotPassword.findOne({
        where: {
            otp: req.body.otp
        }
    }).then((otpData) => {
        if (otpData) {

            User.findOne({
                where: {
                    email: otpData.username
                }
            }).then((user) => {
                if (user) {
                    ForGotPassword.destroy({
                        where: {
                            id: otpData.id
                        }
                    })
                    res.status(200).send({
                        status: true,
                        message: "Your Otp has been verified!",
                        user
                    })
                } else {
                    res.status(200).send({
                        status: false,
                        message: "User not found!!!"
                    })
                }

            }).catch((error) => res.status(200).send({
                status: false,
                error
            }))
        } else {
            res.status(200).send({
                status: false,
                message: "Invalid OTP"
            })
        }
    })
}


var createSupportMessage = (req, res) => {
    Support.create(req.body).then((data) => {
        res.status(200).send({
            status: true,
            message: "Message sent successfully"
        })
    }).catch((error) => {
        res.status(200).send({
            status: false,
            error
        })
    })
}

var createUpdateUserLocation = (req, res) => {
    if (req.body.userId) {
        Location.findOne({
            where: {
                userId: req.body.userId
            }
        }).then((location) => {
            location.update({
                cordinates: req.body.cordinates
            }).then((data) => {
                res.status(200).send({
                    status: true,
                    message: 'location updated successfully!',
                    data
                });
            }).catch(error => res.status(500).send({ status: false, error }));
        }).catch(error => res.status(500).send({ status: false, error }));
    } else {
        Location.create({
            userId: req.authUser.id,
            cordinates: req.body.cordinates
        }).then((data) => {
            res.status(200).send({
                status: true,
                data
            });
        }).catch(error => res.status(500).send({ status: false, error }));
    }
}


var userLocation = (req, res) => {
    Location.findOne({
        where: {
            userId: req.authUser.id
        }
    }).then((data) => {
        res.status(200).send({
            status: true,
            data
        });
    }).catch(error => res.status(500).send({ status: false, error }));
}

var updateUserStatus = (req, res) => {
    User.findOne({
        where: {
            id: req.body.userId
        }
    }).then((user) => {
        user.update({
            status: req.body.status
        }).then((updatedUser) => {
            res.status(200).send({
                status: true,
                message: 'User Status Updated Successfullyy',
                updatedUser
            })
        }).catch((error) => {
            res.status(200).send({
                status: false,
                error
            })
        })
    }).catch((error) => {
        res.status(200).send({
            status: false,
            error
        })
    })
}

var followUnfollowUser = (req, res) => {
    Follower.findOne({
        where: {
            followerId: req.authUser.id,
            userId: req.body.userId
        }
    }).then((data) => {
        if (data) {
            Follower.destroy({
                where: {
                    followerId: req.authUser.id,
                    userId: req.body.userId
                }
            }).then((d) => {
                res.status(200).send({
                    status: true,
                    message: 'user unfollowed successfully'
                })
            }).catch(error => res.status(500).send({ status: false, error }));
        } else {
            Follower.create({
                followerId: req.authUser.id,
                userId: req.body.userId
            }).then((d) => {
                res.status(200).send({
                    status: true,
                    message: 'user followed successfully'
                })
            }).catch(error => res.status(500).send({ status: false, error }));
        }
    }).catch(error => res.status(500).send({ status: false, error }));
}

var myCheckins = (req, res) => {
    Checkin.findAll({
        where: {
            userId: req.authUser.id
        },
        include: [
            {
                model: Venue,
                include: [
                    {
                        model: User
                    },
                    {
                        model: Category
                    },
                    {
                        model: GalleryImageType,
                        include: [GalleryImage]
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

var userCheckins = (req, res) => {
    var { userId } = req.params;
    Checkin.findAll({
        where: {
            userId: userId
        },
        include: [
            {
                model: Venue,
                include: [
                    {
                        model: User
                    },
                    {
                        model: Category
                    },
                    {
                        model: GalleryImageType,
                        include: [GalleryImage]
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

var verifyEmail = async (req, res) => {
    ForGotPassword.findOne({
        where: {
            otp: req.body.otp,
            username: req.body.email
        }
    }).then((otpData) => {
        if (otpData) {

            User.findOne({
                where: {
                    email: otpData.username
                }
            }).then(async (user) => {
                if (user) {
                    ForGotPassword.destroy({
                        where: {
                            id: otpData.id
                        }
                    })
                    var data = await user.update({ emailVerified: 1 });
                    res.status(200).send({
                        status: true,
                        message: "Your Eamil has been verified!",
                        data
                    })
                } else {
                    res.status(200).send({
                        status: false,
                        message: "User not found!!!"
                    })
                }

            }).catch((error) => res.status(200).send({
                status: false,
                error
            }))
        } else {
            res.status(200).send({
                status: false,
                message: "Invalid OTP"
            })
        }
    })
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function suggestUsernames(req, res) {
    try {

        const fullName = req.body.fullName;
        const nameParts = fullName.split(' ');
        const firstName = nameParts[0].toLowerCase();
        const lastName = nameParts[nameParts.length - 1].toLowerCase();

        const usernameSuggestions = [
            `${firstName}${lastName}`,
            `${firstName}_${lastName}`,
            `${firstName}.${lastName}`,
            `${firstName}-${lastName}`,
            `${firstName}${lastName}${getRandomNumber(100, 999)}`,
            `${firstName}_${lastName}${getRandomNumber(100, 999)}`,
            `${firstName}.${lastName}${getRandomNumber(100, 999)}`,
            `${firstName}-${lastName}${getRandomNumber(100, 999)}`,
            `${lastName}${firstName}`,
            `${lastName}_${firstName}`,

        ];

        // Check if any of the usernames already exist in the database
        const existingUsernames = await User.findAll({
            where: {
                username: usernameSuggestions
            }
        });

        // Filter out existing usernames
        const data = usernameSuggestions.filter(username => {
            return !existingUsernames.some(user => user.username === username);
        });
        res.status(200).send({
            status: true,
            data
        })
    } catch (error) {
        console.error('Error suggesting usernames:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}
module.exports = {
    signup,
    signin,
    updateUser,
    getUser,
    resetPassword,
    forgotPasswordByEmailSendOtp,
    forgotPasswordByEmailVerifyOtp,
    createSupportMessage,
    updateUserStatus,
    createUpdateUserLocation,
    userLocation,
    followUnfollowUser,
    userProfile,
    myCheckins,
    userCheckins,
    verifyEmail,
    suggestUsernames,
    socialLogin

}