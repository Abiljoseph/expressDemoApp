const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req,res) => {
    const { name,email,password } = req.body
    if(!name || ! email || !password){
        return res.status(400).json({message:"all fields are required"})
    } 
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(409).json({message: "User already registered"}) 
    }
    // ensure we await the async hashing function so a string (not a Promise) is stored
    const hashedPassword = await hashPassword(password);
    const user = new User({name, email, password: hashedPassword});
    try {
        await user.save();
        // send a response on success
        return res.status(201).json({ message: "User created", userId: user._id });
    } catch (error) {
        return res.status(500).json({message:"Internal server error", error});
    }
}

const SignIn = async (req, res) => {
    try {
        const {email, password} = req.body;

        const isUserExist = await User.findOne({email});
        if(!isUserExist){
            return res.status(404).json({message: "User not found"});
        }
        const ispasswordValid = await bcrypt.compare(password,isUserExist.password)
        if(!ispasswordValid){
            return res.status(402).json({massage:" Invalid credantials"})
        } 
        const token = jwt.sign(
            {
               id: isUserExist._id,
               email: isUserExist.email},
               process.env.JWTSECRET,
               {expiresIn:"2h"}
        )
        res.status(200).json({
            message:"signin successfull",
            user:{id:isUserExist._id,email:isUserExist.email},
            token
        });
    } catch (error) {
        console.error("Signin error", error);
        res.status(500).json({message:"server  error"})
    }
};


async function hashPassword(plainTextPassword) {
  const saltRounds = 10; 
  const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
  return hashedPassword;
}

module.exports = {signUp,SignIn}