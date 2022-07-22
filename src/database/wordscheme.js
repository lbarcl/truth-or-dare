import mongoose from "mongoose";

const wordScheme = new mongoose.Schema({
    '_id': Number,
    'word': String
});

const wordModel = mongoose.models.wordindex || mongoose.model('wordindex', wordScheme, 'wordindex');

export { wordModel };