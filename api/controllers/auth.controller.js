import User from '../models/user.model.js';
import bycrypt from 'bcryptjs';
import { errorHandler } from '../utils/errors.js';
import jwt from 'jsonwebtoken';


export const signup =  async (req, res, next) => {
    // destructure, hash and save data in database
   const {username, email, password } = req.body;
   const hashedPassword =  bycrypt.hashSync(password, 10);  
   const newUser = new User({ username, email, password: hashedPassword });
   try {
    await newUser.save()
    res.status(201).json("Success(201): user created in database");
   } catch (error) {
    next(error);
   }    
}

export const signin = async (req, res, next) => {    
  const {email, password} = req.body;
  try {
    // you can authenticate the user using username + password
    // or email + password as both will be unique
    const validUser = await User.findOne({ email });
    if(!validUser) return next(errorHandler(404, "User not found!"));
    //compare password passed in from user by hashing it first with compareSync   
    const validPassword = bycrypt.compareSync(password, validUser.password);
    if(!validPassword) return next(errorHandler(404, "Username, email, or password incorrect!"));
    // user is validated so create json web token cookie adding our own salt from process.env
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET):
    // remove the hashed password from the res
    const { password: pass, ...rest} = validUser._doc;
    res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
  } catch (error) {
    next(error);
    
  }  
}

