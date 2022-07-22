import mongoose from "mongoose";

const dareScheme = new mongoose.Schema({
    words: [Number],
});

const dareModel = mongoose.models.dare || mongoose.model('dare', dareScheme, 'dare')

export { dareModel };