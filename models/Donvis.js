const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const donviSchema = new Schema({
    tendonvi: String,
    kyhieu: String,
    active: Boolean
},
{timestamps: true});

const Donvis = mongoose.model('Donvis', donviSchema);

module.exports = Donvis;