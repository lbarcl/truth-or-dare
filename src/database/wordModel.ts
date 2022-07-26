import {models, model, Schema} from 'mongoose';

const wordSchema = new Schema({
    '_id': Number,
    'word': String
});

const Wordindex = models.wordindex || model('wordindex', wordSchema, 'wordindex');

export default Wordindex;