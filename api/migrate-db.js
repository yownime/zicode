import { createClient } from '@libsql/client';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });

    // Menambahkan kolom sort_order jika belum ada.
    // Catatan: SQLite tidak mendukung IF NOT EXISTS untuk ADD COLUMN secara langsung,
    // jadi kita gunakan try-catch.
    try {
      await client.execute(`ALTER TABLE portfolios ADD COLUMN sort_order INTEGER DEFAULT 0`);
    } catch (e) {
      if (!e.message.includes('duplicate column name')) {
        throw e;
      }
    }

    res.status(200).json({ message: 'Migrasi database berhasil! Kolom sort_order telah ditambahkan.' });
  } catch (error) {
    console.error('Database Migration Error:', error);
    res.status(500).json({ error: 'Gagal melakukan migrasi database', details: error.message });
  }
}
