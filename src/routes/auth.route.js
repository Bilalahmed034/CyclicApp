const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkEmail = require('../middlewares/checkEmail');
const checkPhone = require('../middlewares/checkPhone');
const { signup: signupValidator, signin: signinValidator, email: verifyEmailValidator } = require('../validators/auth');

const authenticateToken = require('../middlewares/authenticate');
const checkBusinessUser = require('../middlewares/checkBusinessUser');
const userController = require('../controllers/user/userController');
const adminController = require('../controllers/admin/adminController');
const interestController = require('../controllers/admin/interestController');
const prefrencController = require('../controllers/user/prefrenceController');
const postController = require('../controllers/user/postController');
const venueController = require('../controllers/user/venueController');
const categoryController = require('../controllers/admin/categoryController');
const notificationController = require('../controllers/user/notificationController');

// !User Routes
router.route('/signup')
    .post(asyncHandler(checkEmail), asyncHandler(checkPhone), asyncHandler(userController.signup));
router.route('/login')
    .post(asyncHandler(userController.signin));
router.route('/social-login')
    .post((req , res , next)=>{if(!req.body.idOrEmail){return res.status(400).send({status:false,message:'idOrEmail is required for social login'})}else{next()}},asyncHandler(userController.socialLogin));
router.route('/my-profile')
    .get(authenticateToken, asyncHandler(userController.getUser));
router.route('/user/profile/:userId')
    .get(authenticateToken, asyncHandler(userController.userProfile));
router.route('/update-user')
    .post(authenticateToken, asyncHandler(userController.updateUser));
router.route('/suggest-usernames')
    .post(asyncHandler(userController.suggestUsernames));
router.route('/reset-password')
    .post(authenticateToken, asyncHandler(userController.resetPassword));
router.route('/forgetPasswordByEmail')
    .post(asyncHandler(userController.forgotPasswordByEmailSendOtp));
router.route('/verifyUserOtp')
    .post(asyncHandler(userController.forgotPasswordByEmailVerifyOtp));
router.route('/verify-signup-otp')
    .post(asyncHandler(userController.verifyEmail));
router.route('/user-list')
    .get(authenticateToken, adminController.allUsers)
router.route('/update-user-status')
    .post(authenticateToken, userController.updateUserStatus)
router.route('/updateUserPassword')
    .post(asyncHandler(adminController.resetUserPassword));
// prefrence routes
router.route('/create-update-prefrences')
    .post(authenticateToken, asyncHandler(prefrencController.createUpdatePrefrences));
router.route('/prefrences')
    .get(authenticateToken, asyncHandler(prefrencController.userPrefrences));
// prefrence routes ends here

//Notification routes 
router.route('/create-notification')
    .post(authenticateToken, asyncHandler(notificationController.createNotification));
router.route('/mark-notifications-read')
    .post(authenticateToken, asyncHandler(notificationController.markIsRead));
router.route('/user/notifications')
    .get(authenticateToken, asyncHandler(notificationController.myNotifications));
//Notification routes end here

// location routes
router.route('/create-update-user-location')
    .post(authenticateToken, asyncHandler(userController.createUpdateUserLocation));
router.route('/user/location')
    .get(authenticateToken, asyncHandler(userController.userLocation));
// location routes ends here
// follow routes
router.route('/follow-unfollow-user')
    .post(authenticateToken, asyncHandler(userController.followUnfollowUser));
router.route('/user/location')
    .get(authenticateToken, asyncHandler(userController.userLocation));
// follow routes ends here
// venue routes
router.route('/favorite-venues')
    .get(authenticateToken, asyncHandler(venueController.favoriteVenues));
router.route('/add-remove-favorite-venue')
    .post(authenticateToken, asyncHandler(venueController.addFavoriteVenue));
router.route('/rate-venue')
    .post(authenticateToken, asyncHandler(venueController.rateVenue));
// venue routes end here   

// post routes

router.route('/create-post')
    .post(authenticateToken, asyncHandler(postController.createPost));
router.route('/update/post/:postId')
    .put(authenticateToken, asyncHandler(postController.updatePost));
router.route('/delete/post/:postId')
    .delete(authenticateToken, asyncHandler(postController.deletePost));
router.route('/user/posts')
    .get(authenticateToken, asyncHandler(postController.userPosts));
router.route('/posts')
    .get(authenticateToken, asyncHandler(postController.allPosts));
router.route('/like-unlike-post')
    .post(authenticateToken, asyncHandler(postController.likeUnlikePost));
router.route('/create-post-comment')
    .post(authenticateToken, asyncHandler(postController.createPostComment));
router.route('/delete/post/comment/:postCommentId')
    .delete(authenticateToken, asyncHandler(postController.deletePostComment));
// post routes ends here

// Checkin routes
router.route('/check-in')
    .post(authenticateToken, asyncHandler(postController.checkIn));
router.route('/check-out')
    .post(authenticateToken, asyncHandler(postController.checkOut));
router.route('/user/checkins/:userId')
    .get(authenticateToken, asyncHandler(userController.userCheckins));
router.route('/my/checkins')
    .get(authenticateToken, asyncHandler(userController.myCheckins));
// Checkin routes ends here
// venue routes

router.route('/create-venue')
    .post(authenticateToken, asyncHandler(venueController.createVenue));
router.route('/update/venue/:venueId')
    .put(authenticateToken, asyncHandler(venueController.updateVenue));
router.route('/delete/venue/:venueId')
    .delete(authenticateToken, asyncHandler(venueController.deleteVenue));
router.route('/user/venues')
    .get(authenticateToken, asyncHandler(venueController.userVenues));
router.route('/venues')
    .get(authenticateToken, asyncHandler(venueController.allVenues));
// venue routes ends here

// !Admin Routes
//Interest Routes 
router.route('/create-update-interest')
    .post(authenticateToken, asyncHandler(interestController.createUpdateInterest));
router.route('/delete-interests')
    .post(authenticateToken, asyncHandler(interestController.deleteInterests));
router.route('/interests')
    .get(authenticateToken, interestController.allInterests)
//Interest Routes ends here

//Category Routes 
router.route('/create-update-category')
    .post(authenticateToken, asyncHandler(categoryController.createUpdateCategory));
router.route('/delete-categories')
    .post(authenticateToken, asyncHandler(categoryController.deleteCategoires));
router.route('/categories')
    .get(authenticateToken, categoryController.allCategories)
//Category Routes ends here
router.route('/users')
    .get(authenticateToken, adminController.allUsers)

//support message
router.route('/support-message')
    .post(userController.createSupportMessage);
router.route('/all-support-messages')
    .get(authenticateToken, adminController.supportMessages);

// Checkins

router.route('/all-checkins')
    .get(authenticateToken, adminController.allCheckins);

module.exports = router;