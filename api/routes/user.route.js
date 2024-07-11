import express from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


router.get('/test', test);
// to update user we need to verify the cookie we stored as access_token using verifyToken
router.post('/update/:id', verifyToken, updateUser);

export default router;