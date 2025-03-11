const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const protect = async (req,res,next) => {

    let token = req.headers.authorization;

    if(!token) return res.status(401).json({message:"Not authorized"});

    try{
        const decoded = jwt.verify(token.split(" ")[1],process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch(error) {
        res.status(401).json({message:"Invalid token"})
    }
}

module.exports = {protect}