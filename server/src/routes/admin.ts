import express from 'express';
import { authRegister, login } from '../controllers/admin';
export const adminRoutes = express.Router();

adminRoutes.route('/register').post(authRegister);
adminRoutes.route('/login').post(login);
