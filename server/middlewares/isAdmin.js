module.exports = (req,res,next) => { 
    if(req.user.isAdmin) { 
        next();
    }else { 
        res.status(401).json({message : "You are not allowed to make this action! You must be an administrator!"})
    }
}