const jwt = require("jsonwebtoken");

const Protect = (req,res,next) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        {
          token = req.headers.authorization.split(" ")[1];
        }
    if(!token){
        return res.status(401).json({message:"Not authorized, no token"})
    }
    const decoded = jwt.verify(token, process.env.JWTSECRET)
    req.user = decoded
    next();
    } catch (error) {
        console.error("Auth error", error.message)
        return res.status(401).json({message: "Invalid or expired token"})
    }
}

module.exports = Protect