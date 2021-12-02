const db = require("../../models");

const Post = db.post;
const PostComment = db.postComment;
const PostLike = db.postLike;
const User = db.user;
const Venue = db.venue;
const Checkin = db.checkin;


var createPost = async (req, res) => {
    req.body.userId = req.authUser.id;
    Post.create(req.body).then(async (data) => {

        res.status(200).send({
            status: true,
            message: 'Post created succesfully',
            data
        })
    }).catch(error => res.status(200).send({ status: false, error }))
}

var checkIn = async (req, res) => {
    var currentCheckins = await Checkin.count({
        where: {
            venueId: req.body.venueId
        }
    });
    Venue.findOne({
        where: {
            id: req.body.venueId
        }
    }).then((v) => {
        v.update({
            status: currentCheckins >= 20 ? 'busy' : 'quite'
        })
    }).catch(error => console.error(error))
    req.body.userId = req.authUser.id;

    Checkin.create({
        userId: req.authUser.id,
        venueId: req.body.venueId,
        checkInTime: Date(),
    }).then((data) => {

        res.status(200).send({
            status: true,
            message: 'Succesfully checked in',
            data
        })
    }).catch(error => res.status(200).send({ status: false, error }))
}

var checkOut = (req, res) => {

    req.body.userId = req.authUser.id;

    Checkin.update({
        isCheckedOut : 1, 
        checkOutTime: Date()
    }, {
        where: {
            id: req.body.checkInId,
        }
    }).then(async (checkedOut) => {
        var currentCheckins = await Checkin.count({
            where: {
                venueId: req.body.venueId
            }
        });
        Venue.findOne({
            where: {
                id: req.body.venueId
            }
        }).then((v) => {
            v.update({
                status: currentCheckins >= 20 ? 'busy' : 'quite'
            }).then((data) => {
                res.status(200).send({
                    status: true,
                    message: 'Succesfully checked out',
                })
            }).catch(error => res.status(200).send({ status: false, error }))
        }).catch(error => res.status(200).send({ status: false, error }))

    }).catch(error => res.status(200).send({ status: false, error }))
}

var updatePost = (req, res) => {
    var { postId } = req.params;
    Post.findOne({
        where: {
            id: postId
        }
    }).then((post) => {
        if (post) {
            post.update(req.body).then((data) => {
                res.status(200).send({
                    status: true,
                    message: 'Post updated succesfully',
                    data
                })
            }).catch(error => res.status(200).send({ status: false, error }))
        } else {
            res.status(500).send({
                status: false,
                message: 'Post could not be found',
                data
            })
        }
    }).catch(error => res.status(200).send({ status: false, error }))

}
var deletePost = (req, res) => {
    var { postId } = req.params;
    Post.destroy({
        where: {
            id: postId
        }
    }).then((data) => {
        PostComment.destroy({
            where: {
                postId: postId
            }
        });
        PostLike.destroy({
            where: {
                postId: postId
            }
        });
        res.status(200).send({
            status: true,
            message: data + ' post deleted successfully!'
        })
    }).catch(error => res.status(500).send({ status: false, error }));

};

var allPosts = (req, res) => {
    Post.findAll(
        {
            include: [
                {
                    model: User
                },
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
    ).then((data) => {
        res.status(200).send({
            status: true,
            data
        })
    }).catch(error => res.status(500).send({ status: false, error }));
}

var likeUnlikePost = (req, res) => {
    PostLike.findOne({
        where: {
            userId: req.authUser.id,
            postId: req.body.postId
        }
    }).then((data) => {
        if (data) {
            PostLike.destroy({
                where: {
                    userId: req.authUser.id,
                    postId: req.body.postId
                }
            }).then((d) => {
                res.status(200).send({
                    status: true,
                    message: 'Post unliked successfully'
                })
            }).catch(error => res.status(500).send({ status: false, error }));
        } else {
            PostLike.create({
                userId: req.authUser.id,
                postId: req.body.postId
            }).then((d) => {
                res.status(200).send({
                    status: true,
                    message: 'Post Liked successfully'
                })
            }).catch(error => res.status(500).send({ status: false, error }));
        }
    }).catch(error => res.status(500).send({ status: false, error }));
}

var createPostComment = (req, res) => {
    req.body.userId = req.authUser.id;
    PostComment.create(req.body).then((data) => {
        res.status(200).send({
            status: true,
            message: 'Post Comment created succesfully',
            data
        })
    }).catch(error => res.status(200).send({ status: false, error }))
}

var deletePostComment = (req, res) => {
    var { postCommentId } = req.params;
    PostComment.destroy({
        where: {
            id: postCommentId
        }
    }).then((data) => {
        res.status(200).send({
            status: true,
            message: data + ' post comment deleted successfully!'
        })
    }).catch(error => res.status(500).send({ status: false, error }));

};
module.exports = {
    createPost,
    deletePost,
    allPosts,
    updatePost,
    likeUnlikePost,
    deletePostComment,
    createPostComment,
    checkIn,
    checkOut
}