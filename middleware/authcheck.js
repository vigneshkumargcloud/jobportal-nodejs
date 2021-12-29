const jwt=require("jsonwebtoken");
module.exports =(req,res,next)=>{
    try{
        const token= redq.headers.authorization.spilt(" ")[1];
        jwt.verify(token,"secret_this_is_longer");
        next();
    }

    catch(err){
        res.status(401).json({message:'not auth'});        
    }
};