const {User} = require("../model/auth");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generateToken");

const registerUser = async (req,res) => {
    const {name,email,password} = req.body;

    const userExists = await User.findOne({email})
    if(userExists){
        return res.status(400).json("User already Exists")
    }

    const hashedPassword = await bcrypt.hash(password,10)
    const user = await User.create({name,email,password : hashedPassword});

    if(user){
        res.status(200).json({
            id: user._id,
            name: user.name,
            email:user.email,
            token : generateToken(user._id)
        });
    } else {
        res.status(400).json({message : "Invalid user data"})
    }

};

const loginUser = async (req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    
    if(!user){
        res.status(400).json("Please register first")
    }

    if(user &&(await bcrypt.compare(password,user.password))){
        res.status(200).json({
            id : user._id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id)
        })
    }
}

const getUsers = async (req,res) => {
    try{
        const users = await User.find().select("-password");
        res.json(users)
    } catch (error){
        res.status(500).json({ message: "Error fetching users" });
    }
}

module.exports = {registerUser,loginUser,getUsers}