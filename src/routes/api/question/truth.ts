import mongoose from 'mongoose';
import {Truth} from '../../../database/questionModel'; 
import URL from 'url';

// @ts-ignore
export async function GET({ request }) {
    const url = new URL.URL(request.url);
    const result = [];

    // @ts-ignore
    await mongoose.connect(process.env.db_url);

    if (url.searchParams.get('id')) {
        result.push(await Truth.findById(url.searchParams.get('id')));
    } else {
        const agregation = [];

        agregation.push({
            $match: {
                reported: false || null
            }
        });

        if (url.searchParams.get('nsfw') === 'true') {
            agregation.push({ $match: { nsfw: true } });
        }

        let count = 1;
        if (url.searchParams.get('count')) {
            // @ts-ignore
            count = parseInt(url.searchParams.get('count'));
        }
        agregation.push({ $sample: { size: count } });
        const temp = await Truth.aggregate(agregation);
        for (let i = 0; i < temp.length; i++) {
            result.push(temp[i]);
        }
    }

    if (result.length > 0) {
        const turl = new URL.URL('/api/sentence', url.origin);
        
        for (let i = 0; i < result.length; i++) {
            turl.searchParams.set('windex', result[i].words.join(','))
            let response = await fetch(turl.toString());
            let text = await response.text();

            result[i] = {
                id: result[i]._id,
                text: text,
                nsfw: result[i].nsfw
            }
        }
    }

    return {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'same-origin'
        },
        body: result
    }
}