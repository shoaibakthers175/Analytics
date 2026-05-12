import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'text-bison-001' });
try {
  const result = await model.generateContent('Hello');
  console.log('success:', result.response.text());
} catch (err) {
  console.error('ERROR TYPE:', err.constructor.name);
  console.error(err.message || err);
  process.exit(1);
}
