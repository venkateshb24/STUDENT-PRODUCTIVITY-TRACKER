const jwt=require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message:"Token missing"});
    }

    const token=authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({message:"Token missing"});
    }

    if(!JWT_SECRET){
        return res.status(500).json({message:"JWT secret is not configured"});
    }

    try{
        const decoded=jwt.verify(token,JWT_SECRET);
        req.user=decoded;
        next();
    }
    catch(err){
        return res.status(401).json({message:"Invalid token"});
    }
};

module.exports=authMiddleware;
