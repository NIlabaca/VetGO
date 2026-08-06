import { Router } from 'express';
import  {getHome, getServerStatus, getProjectInfo } from '../controllers/home.controller.js';

const router = Router();

//Define GET / dentro
router.get('/', getHome);
router.get('/status', getServerStatus);
router.get('/info', getProjectInfo);

export default router;

