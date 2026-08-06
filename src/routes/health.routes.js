import { Router } from 'express';
import { checkHealth } from '../controllers/health.controller.js';

// routter especifico pra tod lo relacionado con healt
const router = Router();

//Define GET / dentro
router.get('/', checkHealth);

export default router;