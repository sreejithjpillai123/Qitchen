import MenuItem from '../models/MenuItem.js';

// @desc    Fetch all menu items
// @route   GET /api/menu
// @access  Public
export const getMenu = async (req, res) => {
    try {
        const menu = await MenuItem.find({});
        res.json(menu);
    } catch (error) {
        console.error('Error in getMenu:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Add a menu item
// @route   POST /api/menu
// @access  Private/Admin
export const addMenuItem = async (req, res) => {
    const { name, description, price, category, image, available } = req.body;

    try {
        const newItem = new MenuItem({
            name,
            description,
            price,
            category,
            image,
            available
        });

        const createdItem = await newItem.save();
        res.status(201).json(createdItem);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Update a menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
export const updateMenuItem = async (req, res) => {
    const { name, description, price, category, image, available } = req.body;

    try {
        const item = await MenuItem.findById(req.params.id);

        if (item) {
            item.name = name || item.name;
            item.description = description || item.description;
            item.price = price || item.price;
            item.category = category || item.category;
            item.image = image || item.image;
            item.available = available !== undefined ? available : item.available;

            const updatedItem = await item.save();
            res.json(updatedItem);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
export const deleteMenuItem = async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);

        if (item) {
            await item.deleteOne();
            res.json({ message: 'Item removed' });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
