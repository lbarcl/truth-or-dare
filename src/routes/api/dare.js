import mongoose from 'mongoose';
import { dareModel } from '../../database/darescheme';
import URL from 'url';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ request }) {
  //console.log('Connecting to db');
  await mongoose.connect(process.env.db_url)
  //console.log('Connected to db', 'Getting random question');
  const dare = await dareModel.aggregate([
    {
      '$sample': {
        'size': 1
      }
    }
  ])
  //console.log('Got random question', 'Closing db connection');
  //await mongoose.connection.close()
  //console.log('Closed db connection');

  const url = URL.parse(request.url, true)
  url.pathname = url.path = '/api/sentence';
  url.query = { 'windex': dare.map(x => x.words).join(',') }
  //console.log(truth.map(x => x.words).join(','))

  //console.log('Converting truth words to sentence', URL.format(url));
  const response = await fetch(URL.format(url));
  const sentence = await response.text();

  return {
    status: 200,
    headers: {
      'access-control-allow-origin': 'sameorigin'
    },
    body: sentence,
  };
}