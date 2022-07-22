import mongoose from "mongoose";

const truthScheme = new mongoose.Schema({
    words: [Number],
});

const truthModel = mongoose.models.truth || mongoose.model('truth', truthScheme, 'truth')

export { truthModel };