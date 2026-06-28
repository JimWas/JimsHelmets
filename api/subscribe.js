const { Pool } = require('pg');

let pool;
function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
  }
  return pool;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://jimshelmets.org');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let email;
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    email = body?.email?.toLowerCase().trim();
  } catch {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  try {
    const db = getPool();

    await db.query(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id        SERIAL PRIMARY KEY,
        email     TEXT UNIQUE NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    const result = await db.query(
      'INSERT INTO subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING RETURNING id',
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(200).json({ success: true, already: true });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('subscribe error', err);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
};
