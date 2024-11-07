const Tutor = require('../models/Tutor');
const User = require('../models/User');

// Get all tutors
const getAllTutors = async (req, res) => {
    try {
        const tutors = await Tutor.find();
        res.json(tutors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get tutor by ID
const getTutorById = async (req, res) => {
    try {
        const tutor = await Tutor.findById(req.params.id);
        if (!tutor) return res.status(404).json({ message: 'Tutor not found' });
        res.json(tutor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add new tutor
const addTutor = async (req, res) => {
    const tutor = new Tutor(req.body);
    try {
        const newTutor = await tutor.save();
        res.status(201).json(newTutor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update tutor details
const updateTutor = async (req, res) => {
    try {
        const updatedTutor = await Tutor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTutor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete tutor
const deleteTutor = async (req, res) => {
    try {
        await Tutor.findByIdAndDelete(req.params.id);
        res.json({ message: 'Tutor deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllTutors,
    getTutorById,
    addTutor,
    updateTutor,
    deleteTutor
};
