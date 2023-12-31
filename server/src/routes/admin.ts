import express from 'express';
import { authRegister } from '../controllers/admin';
export const adminRoutes = express.Router();

adminRoutes.route('/').post(authRegister);
