import Listing from "../models/listing.modle.js";
import { errorHandler } from "../utils/errors.js";
import mongoose from 'mongoose';

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing)
        
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {
   
    // check if we have a listing using the id from routes/listing.route.js
    const listing = await Listing.findById(req.params.id);
    if(!listing) {
    return next(errorHandler(404, 'Listing not found!'));
    }
    // check if user is the owner of the listing
    if(req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted!');
    } catch (error) {
        next(error);
        
    }
};

export const updateListing = async (req, res, next) => {
    const listingId = req.params.id;

    // Validate the listingId
    if (!mongoose.Types.ObjectId.isValid(listingId)) {
        return next(errorHandler(400, 'Invalid listing ID'));
    }
    // check if listing exists
    const listing = await Listing.findById(req.params.id);
    if(!listing) {
        console.log("Listing not found!")
        return next(errorHandler(404, 'Listing not found!'));
    }
    // check if logged in user owns listing via cookie
    if(req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'You can only update your own listings!'));
    }
    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true},
        )
        res.status(200).json(updatedListing)
        
    } catch (error) {
        next(error);
    }
}