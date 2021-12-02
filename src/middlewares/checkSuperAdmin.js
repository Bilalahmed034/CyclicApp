function checkSuperAdmin (req , res , next){
    if(req.authUser.is_super_admin == 1){
        next();
    }else{
        res.status(403).send({
            status:false,
            message:"Only super admin can access this route!"
        })
    }
};

module.exports = checkSuperAdmin