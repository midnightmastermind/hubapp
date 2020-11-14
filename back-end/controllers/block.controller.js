const Block = require('../models/block.model');
const express = require("express");
const mongoose = require('mongoose');
// Display block of all blocks.
exports.blocks = function(req, res) {
    Block.findOne()
        .populate({
            path: 'children scheduled',
            populate: { path: 'children scheduled', populate: { path: 'children scheduled',  populate: { path: 'children scheduled', populate: { path: 'children scheduled' } } } }
        })
        .then(blocks => res.json(blocks))
        .catch(err => res.status(400).json('Error: ' + err));
};

// Display detail page for a specific block.
exports.block_detail = function(req, res) {
    Block.findById(req.params.id)
        .then(block => res.json(block))
        .catch(err => res.status(400).json('Error: ' + err));
};

// Display block create form on GET.
exports.block_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: block create GET');
};

// Handle block create on POST.
exports.block_create_post = function(req, res) {
    const newBlock = new Block({
        ...req.body.element
    });
     newBlock.save().then(
         block =>Block.findById(block._id)
        .then(block => res.json(block))
        .catch(err => res.status(400).json('Error: ' + err)));
};

// Display block delete form on GET.
exports.block_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: block delete GET');
};

// Handle block delete on POST.
exports.block_delete_post = function(req, res) {
    Block.findByIdAndDelete(req.params.id)
        .then(() => res.json('Block deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
};

// Display block update form on GET.
exports.block_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: block update GET');
};

// Handle block update on POST.
exports.block_update_post = function(req, res) {
    console.log("hit");
    Block.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), {...req.body}, {new: true})
        .then(block => res.json(block))
        .catch(err => res.status(400).json('Error: ' + err));
};

// Handle block update on POST.
exports.blocks_update = function(req, res) {
    const updatedBlock = req.body;
    res.status(200);
};
