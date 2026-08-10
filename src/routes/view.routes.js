import { Router } from "express";

const router = Router();

router.get('/', (req, res) => res.render('login'));
router.get('/persons', (req, res) => res.render('persons'));

export default router;