import mongoose from 'mongoose';
import wordModel from '../../database/wordModel'; 
import URL from 'url';

// @ts-ignore
export async function GET({ request }) {
    const url = new URL.URL(request.url);
    
    if (url.searchParams.has('windex')) {
        const wordindexs = url.searchParams.get('windex')?.split(',').map(w => parseInt(w));

        if (wordindexs) {
            await mongoose.connect('mongodb://localhost:270/tord');
            const words = await wordModel.find({ '_id': {$in: wordindexs } });

            let sentence = '';
            for (let i = 0; i < wordindexs.length; i++) {
                const index = wordindexs[i];
                const word = words.find(word => word._id === index);
                if (word) {
                    if (i == 0)
                        sentence += word.word;
                    else
                        if (word.word.includes('['))
                            sentence += getPunctuation(word.word);
                        else
                            sentence += ' ' + word.word;
                }
            }

            return {
                status: 200,
                headers: {
                    'Content-Type': 'text/plain',
                    'Access-Control-Allow-Origin': 'same-origin',
                },
                body: sentence

            };
        } else {
            return {
                status: 400,
                body: {
                    error: 'Invalid word index'
                }
            };
        }
    } else {
        return {
            status: 400,
            body: {
                error: 'Missing word index'
            }
        };
    }
}

function getPunctuation(text: string): string | null {
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

    return null;
}