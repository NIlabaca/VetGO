import { Router } from 'express';
import healthRoutes from './health.routes.js';
import homeroutes from './home.routes.js';
import authRoutes from  './auth.routes.js';
import personRoutes from './person.routes.js'

const router = Router();
// Estado 
router.use('/health', healthRoutes); ///api/health
// Rutas de Raiz INFO DE LA API
router.use('/', homeroutes);
// RUTA ESTATICA 
router.get ('/check', (req, res)=> {res.redirect('check.html')})
// Ruta del login
router.use('/auth',authRoutes);
// Ruta de las personas
router.use('/persons', personRoutes)

export default router;