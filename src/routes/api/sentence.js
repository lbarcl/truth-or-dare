import mongoose from 'mongoose';
import { wordModel } from '../../database/wordscheme';
import URL from 'url';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ request }) {
    const { query } = URL.parse(request.url, true);
    if (!query) {
        return {
            status: 400,
            headers: {
                'access-control-allow-origin': 'sameorigin',
            },
            body: 'No query string provided',
        }
    } else if (query?.windex === undefined) { 
        return {
            status: 400,
            headers: {
                'access-control-allow-origin': 'sameorigin',
            },
            body: 'No word index provided',
        }
    } else {
        // @ts-ignore
        const indexs = query.windex.split(',').map(index => parseInt(index));
        //console.log('Conneting to db');
        await mongoose.connect(process.env.db_url);
        //console.log('Connected to db', 'Getting words');
        let words = await wordModel.find({ '_id': { $in: indexs } });
        //console.log('Got words', 'Closing db connection');
        //await mongoose.connection.close();
        //console.log('Closed db connection');

        words = words.map(word => {
            return {id: word._id, text: word.word};
        });

        let sentence = '';
        for (let i = 0; i < indexs.length; i++) { 
            const index = indexs[i];
            const word = words.find(word => word.id === index);
            if (word) {
                if (i == 0)
                    sentence += word.text;
                else
                    if (word.text.includes('['))
                        sentence += getPunctuation(word.text);
                    else
                    sentence += ' ' + word.text;
            }
        }

        //console.log(words, newWords);

        return {
            status: 200,
            headers: {
              'access-control-allow-origin': 'sameorigin'
            },
            body: sentence,
        };
    }
}

/**
 * @param {String} text
 */
function getPunctuation(text) {
    const punctuation = {
        ',': '[comma]',
        '.': '[dot]',
        '!': '[exclamation]',
        '?': '[question]',
        ':': '[colon]',
        ';': '[semicolon]',
        '\\': '[backslash]',
        '\'': '[apostrophe]',
        '’': '[apostrophe]',
        '“': '[quote]',
        '”': '[quote]',
        '"': '[quote]',
        '-': '[dash]',
        '_': '[underscore]',
        '=': '[equals]',
        '+': '[plus]',
        '*': '[asterisk]',
        '/': '[slash]',
        '%': '[percent]',
        '$': '[dollar]',
        '#': '[hash]',
        '@': '[at]',
        '&': '[ampersand]',
        '<': '[less-than]',
        '>': '[greater than]',
        '|': '[pipe]',
        '(': '[left-parenthesis]',
        ')': '[right-parenthesis]',
    }

    const keys = Object.keys(punctuation);
    for (let i = 0; i < keys.length; i++) { 
        const key = keys[i];
        // @ts-ignore
        if (punctuation[key] === text) {
            return keys[i];
        }
    }
}