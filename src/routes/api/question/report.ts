import mongoose from 'mongoose';
import { Truth, Dare } from '../../../database/questionModel';
import Report from '../../../database/reportModel';


// @ts-ignore
export async function POST({ request }) {
    const data = await request.json();
    // @ts-ignore
    await mongoose.connect("mongodb+srv://tord:dorc@jahardo.fuchd.mongodb.net/tord?retryWrites=true&w=majority");
    const report = new Report({
        questionType: data.type,
        questionId: data.id,
        reportDescription: data.report
    });
    const savedReport = await report.save();

    if (data.type === 'truth') {
        await Truth.findByIdAndUpdate(data.id, { $set: { reported: true } });
    } else { 
        await Dare.findByIdAndUpdate(data.id, { reported: true });
    }

    return {
        status: 204,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'same-origin',
            'Access-Control-Allow-Methods': 'POST',
        },
        body: {
            message: 'Report created',
            reportId: savedReport._id
        }
    }
}