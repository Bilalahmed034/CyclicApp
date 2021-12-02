const { DB_NAME } = require('../utils/secrets')

const createDB = `SHOW TABLES`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const createTableUSers = `
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NULL,
    lastname VARCHAR(50) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_no VARCHAR(255) NULL,
    address VARCHAR(255) NULL,
    image VARCHAR(1000) NULL,
    is_email_verified INT DEFAULT 0,
    is_phone_verified INT DEFAULT 0,
    is_id_verified INT DEFAULT 0,
    id_image VARCHAR(1000) NULL,
    is_super_admin INT DEFAULT 0 , 
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;
const createTableTraverlerOffers = `
CREATE TABLE IF NOT EXISTS traveler_offers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id int NOT NULL,
    s_address VARCHAR(255) NOT NULL,
    d_address VARCHAR(255) NOT NULL,
    offer_time VARCHAR(255) NOT NULL,
    package_type TEXT NOT NULL,
    max_weight VARCHAR(255) NOT NULL,
    offer_price float NOT NULL,
    status VARCHAR(255) DEFAULT NULL,
    payment_status VARCHAR(255) NOT NULL,
    created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;
const createTableSenderOffers = `
CREATE TABLE IF NOT EXISTS sender_offers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id int NOT NULL,
    s_country VARCHAR(255) NOT NULL,
    s_city_address TEXT NOT NULL,
    d_country VARCHAR(255) NOT NULL,
    d_city_address TEXT NOT NULL,
    is_first_mile_pickup INT DEFAULT 0,
    is_last_mile_delivery INT DEFAULT 0,
    additional_notes TEXT NULL,
    offer_time VARCHAR(255) NULL,
    package_type TEXT NOT NULL,
    package_value VARCHAR(255) NOT NULL,
    package_weight VARCHAR(255) NOT NULL,
    package_length VARCHAR(255) NOT NULL,
    package_width VARCHAR(255) NOT NULL,
    package_height VARCHAR(255) NOT NULL,
    boxed_by_original_manufacturer INT DEFAULT 0,
    require_transit_insurance INT DEFAULT 0,
    package_amount VARCHAR(255) NOT NULL,
    status VARCHAR(255) DEFAULT NULL,
    payment_status VARCHAR(255) DEFAULT 0,
    created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;
const createTableForgotPassword = `
CREATE TABLE IF NOT EXISTS forgot_password (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    otp INT DEFAULT 0,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;
const createTableCounterTravelerOffer = `
CREATE TABLE IF NOT EXISTS counter_traveler_offers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    traveler_offer_id int NOT NULL,
    offered_by_sender int NOT NULL,
    description VARCHAR(255) NOT NULL,
    luggage_detail VARCHAR(255) NOT NULL,
    offered_amount float NOT NULL,
    status  VARCHAR(255) DEFAULT NULL,
    payment_status int DEFAULT 0,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;

const createTableCounterSenderOffer = `
CREATE TABLE IF NOT EXISTS counter_sender_offers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sender_offer_id int NOT NULL,
    offered_by_traveler int NOT NULL,
    description VARCHAR(255) NOT NULL,
    offered_amount float NOT NULL,
    status  VARCHAR(255) DEFAULT NULL,
    payment_status int DEFAULT 0,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;
const createTableAcceptedTravelerOffer = `
CREATE TABLE IF NOT EXISTS accepted_traveler_offers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    traveler_offer_id int NOT NULL,
    accepted_by_sender int NOT NULL,
    status  VARCHAR(255) DEFAULT NULL,
    payment_status int DEFAULT 0,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;
const createTableAcceptedSenderOffer = `
CREATE TABLE IF NOT EXISTS accepted_sender_offers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sender_offer_id int NOT NULL,
    accepted_by_traveler int NOT NULL,
    status  VARCHAR(255) DEFAULT NULL,
    payment_status int DEFAULT 0,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;
const createNewUser = `
INSERT INTO users VALUES(null, ?, ?, ?, ?, ?,null,null,null,null,null,null,0, NOW())
`;

const findUserByEmail = `
SELECT * FROM users WHERE email = ?
`;
const userListing = `
SELECT * FROM users where is_super_admin = 0
`;
const findUserByPhone = `
SELECT * FROM users WHERE phone_no = ?
`;

const getUser = `SELECT * FROM users WHERE id = ?`

const createEmailVerifyOtp = `
INSERT INTO forgot_password VALUES(null, ?, ?,  NOW())
`;
const createPhoneVerifyOtp = `
INSERT INTO forgot_password VALUES(null, ?, ?,  NOW())
`;
const findOtpByEmail = `
SELECT * FROM forgot_password WHERE username = ?
`;

const findPhoneByOtp = `
SELECT * FROM forgot_password WHERE otp = ?
`;

const deleteOtpByEmail = `
DELETE FROM forgot_password WHERE username = ?
`;

const updateUser = `
UPDATE users SET ? WHERE id = ?
`;

const setUserImage = `
UPDATE users SET ? WHERE id = ?
`;
const setEmailVerified = `
UPDATE users SET ? WHERE id = ?
`;
const setPhoneVerified = `
UPDATE users SET ? WHERE id = ?
`;
const setEmailUnVerified = `
UPDATE users SET ? WHERE id = ?
`;
const setPhoneUnVerified = `
UPDATE users SET ? WHERE id = ?
`;

const setIdVerificationImage = `
UPDATE users SET ? WHERE id = ?
`;

const resetPassword = `
UPDATE users SET ? WHERE id = ?
`;

//traveler quries
const createNewTravelerOffer = `
INSERT INTO traveler_offers VALUES(null, ?, ?, ?,?,?,?,?,'pending',0, NOW())
`;

const travelerOfferDetails = `SELECT * FROM traveler_offers WHERE id = ?`
const allTravelerOffers = `SELECT * FROM traveler_offers `;
const userTravelerOffers = `SELECT * FROM traveler_offers WHERE user_id = ? `;
const deleteTravelerOffer = `
DELETE FROM traveler_offers WHERE id = ?
`;

const createNewSenderOffer = `
INSERT INTO sender_offers SET ?
`;

const senderOfferDetails = `SELECT * FROM sender_offers WHERE id = ? `
const allSenderOffers = `SELECT * FROM sender_offers WHERE status = 'pending'`;
const userSenderOffers = `SELECT * FROM sender_offers WHERE user_id = ? `;
const deleteSenderOffer = `
DELETE FROM sender_offers WHERE id = ?
`;
const createCounterTravelerOffer = `
INSERT INTO counter_traveler_offers SET ?
`;

const createCounterSenderOffer = `
INSERT INTO counter_sender_offers SET ?
`;
const counterOffersOftravelerOffer = `SELECT * FROM counter_traveler_offers WHERE traveler_offer_id = ?`
const counterOffersOfSenderOffer = `SELECT * FROM counter_sender_offers WHERE sender_offer_id = ?`

const truncateDB ='DROP TABLE IF EXISTS users ,forgotpasswords ,traveleroffers ,senderoffers ,acceptedsenderoffers ,acceptedtraveleroffers,countersenderoffers,countertraveleroffers'
module.exports = {
    truncateDB,
    createDB,
    dropDB,
    createTableUSers,
    createNewUser,
    findUserByEmail,
    getUser,
    createTableForgotPassword,
    createEmailVerifyOtp,
    findOtpByEmail,
    deleteOtpByEmail,
    updateUser,
    setUserImage,
    setEmailVerified,
    createPhoneVerifyOtp,
    setPhoneVerified,
    setIdVerificationImage,
    resetPassword,
    createTableTraverlerOffers,
    createNewTravelerOffer,
    travelerOfferDetails,
    allTravelerOffers,
    deleteTravelerOffer,
    setPhoneUnVerified,
    setEmailUnVerified,
    findPhoneByOtp,
    findUserByPhone,
    userTravelerOffers,
    createTableSenderOffers,
    createNewSenderOffer,
    deleteSenderOffer,
    userSenderOffers,
    allSenderOffers,
    senderOfferDetails,
    userListing,
    createTableCounterTravelerOffer,
    createTableCounterSenderOffer,
    createTableAcceptedSenderOffer,
    createTableAcceptedTravelerOffer,
    createCounterTravelerOffer,
    counterOffersOftravelerOffer,
    createCounterSenderOffer,
    counterOffersOfSenderOffer
};
