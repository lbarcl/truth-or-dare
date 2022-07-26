import {models, model, Schema} from 'mongoose';

const reportSchema = new Schema({
    questionType: String,
    questionId: Number,
    reportDescription: String
}, {
    versionKey: false
});

export default models.report || model('report', reportSchema, 'report');