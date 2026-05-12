import 'dotenv/config';
const apiKey = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
console.log('URL', url);
const res = await fetch(url);
const body = await res.text();
console.log('status', res.status);
console.log(body);
