import express from 'express';
import { deleteUser, test, updateUser, getUserListings} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


router.get('/test', test);
// to update user we need to verify the cookie we stored as access_token using verifyToken
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id',verifyToken, deleteUser);
// get all listing of user
router.get('/listing/:id', verifyToken, getUserListings);


export default router;