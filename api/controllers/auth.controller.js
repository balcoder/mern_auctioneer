import User from '../models/user.model.js';
import bycrypt from 'bcryptjs';

export const signup =  async (req, res) => {
    // destructure, hash and save data in database
   const {username, email, password } = req.body;
   const hashedPassword =  bycrypt.hashSync(password, 10);  
   const newUser = new User({ username, email, password: hashedPassword });
   try {
    await newUser.save()
    res.status(201).json("Success(201): user created in database");
   } catch (error) {
    res.status(500).json(error.message);
   }
    
}