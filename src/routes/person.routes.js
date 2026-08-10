import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getAllPerson, getPersonById, createPerson, updatePerson, deletePerson } from '../controllers/person.controller.js';

const router = Router();

router.get('/', authMiddleware, getAllPerson);
router.get('/:id', authMiddleware, getPersonById);
router.post('/', authMiddleware, createPerson);
router.put('/:id',authMiddleware, updatePerson);
router.delete('/:id', authMiddleware, deletePerson);

export default router;