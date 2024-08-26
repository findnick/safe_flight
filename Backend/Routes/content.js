import express from 'express'
const routes = express.Router();

import { getContent, addContent } from '../Controllres/content.js';
import admin from '../middlewares/admin.js';

routes.get('/', getContent);
routes.post('/addContent', admin, addContent);

export default routes
