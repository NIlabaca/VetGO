import { Router } from 'express';
import healthRoutes from './health.routes.js';
import homeroutes from './home.routes.js';

const router = Router();
// Estado 
router.use('/health', healthRoutes); ///api/health
// Rutas de Raiz
router.use('/', homeroutes);


export default router;