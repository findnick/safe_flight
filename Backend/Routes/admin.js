import express from 'express';
import auth from '../middlewares/auth.js'
const routes = express.Router();


import { getAdminData, getAllUserData, getSpecificUserData, deleteUserData } from '../Controllres/admin.js';

// @Get Request
routes.get('/', auth, getAdminData)