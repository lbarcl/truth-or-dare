import {models, model, Schema} from 'mongoose';

const questionSchema = new Schema({
    '_id': Number,
    'words': [Number],
    'nsfw': Boolean,
    'reported': {type: Boolean, default: false},
});

const Dare = models.dare || model('dare', questionSchema, 'dare');
const Truth = models.truth || model('truth', questionSchema, 'truth');

export {Truth, Dare};