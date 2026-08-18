import { Species } from '../models/species.models.js';


// GET /api/species -- Obtener todas las ESPECIES
export const getAllSpecies = async (req, res) => {
    try {
        const species = await Species.findAll();
        res.json(species);
    } catch (error) {
        return res.status(500).json({ message: 'Error Al Obtener Las especies de animales', error: error.message });
    }
}

