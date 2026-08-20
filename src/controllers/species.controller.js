import { Species } from '../models/species.models.js';

// GET /api/species -- Obtener todas las ESPECIES
export const getAllSpecies = catchAsync(async (req, res) => {
    const species = await Species.findAll();
    res.json(species);
});

// GET /api/species -- Obtener una ESPECIES por id
export const getSpeciesById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const species = await Species.findByPk(id);

    if (!species) {
        return next(new AppError('Especie no encontrada', 404));
    }
    res.json(species);
});

// POST /api/species -- crear nueva especie
export const createSpecies = catchAsync(async (req, res, next) => {
    const { common_name } = req.body;

    if (!common_name) {
        return next(new AppError('Nombre de la Especie requerida', 400));
    }

    const newSpecie = await Species.create({ common_name });
    res.status(201).json(newSpecie);
});

//PUT /api/species/:id --actualizar una especie 
export const updateSpecies = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { common_name } = req.body;

    const species = await Species.findByPk(id);

    if (!species) {
        return next(new AppError('Especie no encontrada', 404));
    }

    await species.update({ common_name });
    res.json(species);
});

//DELETE /api/persons/:id --ELIMINAR una persona 
export const deleteSpecies = catchAsync(async (req, res) => {
    const { id } = req.params;
    const species = await Species.findByPk(id);

    if (!species) {
        return next(new AppError('Especie no encontrada', 404));
    }

    await species.destroy();
    res.json({ message: 'Especie eliminada correctamente' });

})