import { Person } from '../models/index.js';
import { catchAsync } from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';

// GET /api/persons -- Obtener todas las personas
export const getAllPerson = catchAsync(async (req, res) => {
    const persons = await Person.findAll();
    res.json(persons);
});

// GET /api/persons -- Obtener una personas por id
export const getPersonById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const person = await Person.findByPk(id);

    if (!person) {
        return next(new AppError('Persona no encontrada', 404));
    }
    res.json(person);

});


// POST /api/persons -- crear nueva persona
export const createPerson = catchAsync(async (req, res, next) => {
    const { full_name, email, phone_number } = req.body;

    if (!full_name || !email || !phone_number) {
        return next(new AppError('full_name, email y phone_number son obligatorios', 400));
    }

    const newPerson = await Person.create({ full_name, email, phone_number });
    res.status(201).json(newPerson);
});

//PUT /api/persons/:id --actualizar una persona 
export const updatePerson = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { full_name, email, phone_number } = req.body;

    const person = await Person.findByPk(id);

    if (!person) {
        return next(new AppError('Persona no encontrada', 404));
    }

    await person.update({ full_name, email, phone_number });
    res.json(person);

});

//DELETE /api/persons/:id --ELIMINAR una persona 
export const deletePerson = catchAsync(async (req, res) => {
    const { id } = req.params;
    const person = await Person.findByPk(id);

    if (!person) {
        return next(new AppError('Persona no encontrada', 404));
    }

    await person.destroy();
    res.json({ message: 'Persona eliminada correctamente' });

})