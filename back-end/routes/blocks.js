const router = require('express').Router();
const block_controller = require('../controllers/block.controller');


// GET request for creating block. NOTE This must come before route for id (i.e. display block).
router.get('/create', block_controller.block_create_get);

// POST request for creating block.
router.post('/create', block_controller.block_create_post);
// POST request to update all blocks.
router.post('/update', block_controller.blocks_update);

// GET request to delete block.
router.get('/:id/delete', block_controller.block_delete_get);

// POST request to delete block.
router.post('/:id/delete', block_controller.block_delete_post);

// GET request to update block.
router.get('/:id/update', block_controller.block_update_get);

// POST request to update blocks
router.post('/:id/update', block_controller.block_update_post);

// GET request for one block.
router.get('/:id', block_controller.block_detail);


// GET request for list of all blocks.
router.get('/', block_controller.blocks);

module.exports = router;
