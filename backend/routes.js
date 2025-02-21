import express from 'express';
import { imageController } from './controller/imageController.js';
import { storeFileInfo } from './controller/storeFileController.js';
import { getFile } from './controller/downloadFileController.js';
import { registerUser, loginUser } from './controller/authController.js';  // ✅ FIXED

const routes = express.Router();

routes.get('/image-url', imageController);
routes.post('/store-file', storeFileInfo);
routes.get('/get-file/:uniqueCode', getFile); 
routes.post('/register', registerUser); // ✅ Corrected
routes.post('/login', loginUser);

export default routes;
