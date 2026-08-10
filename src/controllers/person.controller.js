import { Person } from '../models/index.js';


// GET /api/persons -- Obtener todas las personas
export const getAllPerson = async (req, res) => {
    try {
        const persons = await Person.findAll();
        res.json(persons);
    } catch (error) {
        return res.status(500).json({ message: 'Error Al Obtener personas', error: error.message });
    }
}

// GET /api/persons -- Obtener una personas por id
export const getPersonById = async (req, res) => {
    try {
        const { id } = req.params;
        const person = await Person.findByPk(id);

        if (!person) {
            return res.status(400).json({ message: 'Persona no encontrada', error: error.message });
        }

        res.json(person);
    } catch (error) {
        return res.status(500).json({ message: 'Error Al Obtener personas', error: error.message });
    }
}

// POST /api/persons -- crear nueva persona
export const createPerson = async (req, res) => {
    try {
        const { full_name, email, phone_number } = req.body;

        if (!full_name || !email || !phone_number) {
            return res.status(400).json({ message: 'Nombre, email y numero deben sesr obligatorio', error: error.message });
        }

        const newPerson = await Person.create({ full_name, email, phone_number });
        res.status(201).json(newPerson);
    } catch (error) {
        return res.status(500).json({ message: 'Error Al crear personas', error: error.message });
    }
}

//PUT /api/persons/:id --actualizar una persona 
export const updatePerson = async (req, res) => {
    try {
        const { id } = req.params;
        const { full_name, email, phone_number } = req.body;

        const person = await Person.findByPk(id);

        if (!person) {
            return res.status(400).json({ message: 'Persona no encontrada', error: error.message });
        }

        await person.update({ full_name, email, phone_number });
        res.json(person);
    } catch (error) {
        return res.status(500).json({ message: 'Error Al actualizar persona', error: error.message });
    }
}

//DELETE /api/persons/:id --ELIMINAR una persona 
export const deletePerson = async (req, res) => {
    try {
        const { id } = req.params;
        const person = await Person.findByPk(id);


        if (!person) {
            return res.status(400).json({ message: 'Persona no encontrada', error: error.message });
        }

        await person.destroy();
        res.json({ message: 'Persona eliminada correctamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Error Al eliminar persona', error: error.message });
    }
}