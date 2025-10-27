// frontend/src/api/api.js
const base = process.env.REACT_APP_API || 'http://localhost:5000/api';

async function handle(res) {
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}

export default {
  get: async (path) => {
    const res = await fetch(`${base}${path}`);
    return handle(res);
  },
  post: async (path, body) => {
    const res = await fetch(`${base}${path}`, {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify(body)
    });
    return handle(res);
  },
};
