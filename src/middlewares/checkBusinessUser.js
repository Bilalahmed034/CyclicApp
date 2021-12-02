function checkSuperAdmin (req , res , next){
    if(req.authUser.role == "businessUser"){
        next();
    }else{
        res.status(403).send({
            status:false,
            message:"Only Business users can create venues update your account or do something else!"
        })
    }
};

module.exports = checkSuperAdmin