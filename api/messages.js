import { createClient } from '@libsql/client';

const dbClient = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Verifikasi Akses Admin
    if (req.headers.authorization !== process.env.ADMIN_SECRET_KEY) {
      return res.status(401).json({ error: 'Akses ditolak' });
    }

    try {
      const result = await dbClient.execute('SELECT * FROM messages ORDER BY created_at DESC');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Gagal mengambil data pesan' });
    }
  } 
  
  else if (req.method === 'POST') {
    // Publik bisa mengirim pesan
    const { name, email, project_type, details } = req.body;
    
    if (!name || !email || !details) {
      return res.status(400).json({ error: 'Nama, email, dan pesan harus diisi' });
    }

    const id = crypto.randomUUID();

    try {
      await dbClient.execute({
        sql: 'INSERT INTO messages (id, name, email, project_type, details, is_read) VALUES (?, ?, ?, ?, ?, 0)',
        args: [id, name, email, project_type || 'General Inquiry', details],
      });

      res.status(201).json({ message: 'Pesan berhasil dikirim!' });
    } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ error: 'Gagal mengirim pesan' });
    }
  }

  else if (req.method === 'PUT') {
    // Update is_read
    if (req.headers.authorization !== process.env.ADMIN_SECRET_KEY) {
      return res.status(401).json({ error: 'Akses ditolak' });
    }

    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'ID tidak valid' });

    try {
      await dbClient.execute({
        sql: 'UPDATE messages SET is_read = 1 WHERE id = ?',
        args: [id]
      });
      res.status(200).json({ message: 'Pesan ditandai sudah dibaca' });
    } catch (error) {
      res.status(500).json({ error: 'Gagal memperbarui status' });
    }
  }

  else if (req.method === 'DELETE') {
    if (req.headers.authorization !== process.env.ADMIN_SECRET_KEY) {
      return res.status(401).json({ error: 'Akses ditolak' });
    }

    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'ID tidak valid' });

    try {
      await dbClient.execute({
        sql: 'DELETE FROM messages WHERE id = ?',
        args: [id]
      });
      res.status(200).json({ message: 'Pesan berhasil dihapus' });
    } catch (error) {
      res.status(500).json({ error: 'Gagal menghapus pesan' });
    }
  }
  
  else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
