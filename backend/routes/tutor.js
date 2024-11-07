const express = require('express');
const router = express.Router();
const { getAllTutors, getTutorById, addTutor, updateTutor, deleteTutor } = require('../controllers/tutorController');

router.get('/', getAllTutors);
router.get('/:id', getTutorById);
router.post('/', addTutor);
router.put('/:id', updateTutor);
router.delete('/:id', deleteTutor);

module.exports = router;
