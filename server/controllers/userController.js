import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const generateToken = (userId)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '7d'})
    return token;
}


// controller for user registration
// post: /api/users/register
export const registerUser = async (req,res) => {
    try{
       const {name,email,password} = req.body;

       // check if all fields are provided
       if(!name || !email || !password){
        return res.status(400).json({message: "All fields are required"});
       }

         // check if user already exists 
         const user = await User.findOne({email});
         if(user){
            return res.status(400).json({message: "User already exists with this email"});
         }

         // create new user
         const hashedPassword = await bcrypt.hash(password, 10);
         const newUser = await User.create({
            name,
            email,
            password: hashedPassword
         })

  //  return success message after token
      const token = generateToken(newUser._id);
      newUser.password = undefined; // hide password in response

      return res.status(201).json({
        message: "User registered successfully",
        user: newUser,
        token
      });
        

    }catch(error){
        console.error("Error registering user:", error);
        res.status(400).json({message: error.message});
    }
}

//--------------------------------------------------------------------------------------------
// controller for user login
// post: /api/users/login

export const loginUser = async (req,res) => {
    try{
       const {email,password} = req.body;


         // check if user already exists 
         const user = await User.findOne({email});
         if(!user){
            return res.status(400).json({message: "Invalid email or password"});
         }

         // check if the password is correct
         if(!user.comparepassword(password)){
            return res.status(400).json({message: "Invalid email or password"});
         }

         // return success message after token

      const token = generateToken(user._id);
      user.password = undefined; // hide password in response

      return res.status(200).json({
        message: "User logged in successfully",
       user
      });
        

    }catch(error){
        console.error("Error logging in user:", error);
        res.status(400).json({message: error.message});
    }
}

//-------------------------------------------------------------------------------------------
// controller for getting user profile
// get: /api/users/profile

export const getUserByID = async (req,res) => {
    try{
       const userId = req.userId
            // check if user already exists
            const user = await User.findById(userId);
            if(!user){
               return res.status(404).json({message: "User not found"});
         }

          //return user
             user.password = undefined; // hide password in response

      return res.status(200).json({ user });
        

    }catch(error){
        console.error("Error logging in user:", error);
        res.status(400).json({message: error.message});
    }
}
