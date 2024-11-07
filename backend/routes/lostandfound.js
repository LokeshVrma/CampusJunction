const express = require('express');
const router = express.Router();
const { getAllLostItems, createLostItem, getLostItemById, deleteLostItem} = require('../controllers/lostAndFoundController')

router.get('/', getAllLostItems);
router.post('/', createLostItem);
router.get('/:id', getLostItemById);
router.delete('/:id', deleteLostItem);

module.exports = router;
