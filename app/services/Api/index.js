const api = 'https://api.themoviedb.org/3';

// The api key is ok to be exposed, it's free and only for self study. I know that the corretly way is to store in a .env file.
const key = 'fea6c19819dbee2d9e440082f32af87a';

const defaultContent = {
  api_key: key,
  language: 'es-ES'
};

function queryString(obj) {
  return Object.entries(obj)
    .map(([index, val]) => `${index}=${val}`)
    .join('&');
}

export default async function request(url, content = {}, debug = false) {
  const obj = { ...defaultContent, ...content };
  const response = await fetch(`${api}/${url}?${queryString(obj)}`);
  const data = await (debug ? response.status : response.json());

  return data;
}
