import mongoose from 'mongoose';
import { Truth, Dare } from '../../../database/questionModel';


// @ts-ignore
export async function POST({ request }) {
    const data = await request.json();
    // @ts-ignore
    await mongoose.connect("mongodb+srv://tord:dorc@jahardo.fuchd.mongodb.net/tord?retryWrites=true&w=majority");
    

    return {
        status: 204,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'same-origin',
            'Access-Control-Allow-Methods': 'POST',
        },
        body: {
            message: 'Question created',
        }
    }
}