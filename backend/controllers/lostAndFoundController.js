const LostItem = require('../models/LostItem');

// Get all lost items
const getAllLostItems = async (req, res) => {
    try {
        const items = await LostItem.find();
        res.status(200).json(items); // Added status code for clarity
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lost items', error: error.message });
    }
};

// Create new lost item
const createLostItem = async (req, res) => {
    const { itemName, description, contactInfo, location, foundBy } = req.body;

    // Validate required fields
    if (!itemName || !description || !contactInfo || !location || !foundBy) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const item = new LostItem({ itemName, description, contactInfo, location, foundBy });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: 'Error creating lost item', error: error.message });
    }
};



// Get lost item by ID
const getLostItemById = async (req, res) => {
    try {
        const item = await LostItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item); // Return the found item
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lost item', error: error.message });
    }
};

// Delete lost item
const deleteLostItem = async (req, res) => {
    try {
        const item = await LostItem.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' }); // Confirm deletion
    } catch (error) {
        res.status(500).json({ message: 'Error deleting lost item', error: error.message });
    }
};

// Exporting all functions at the end
module.exports = {
    getAllLostItems,
    createLostItem,
    getLostItemById,
    deleteLostItem,
};
