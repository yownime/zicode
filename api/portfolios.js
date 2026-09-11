import { createClient } from '@libsql/client';
import { v2 as cloudinary } from 'cloudinary';

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Setup koneksi Turso
const dbClient = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Untuk mengatasi payload gambar base64 yang besar
    },
  },
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Ambil data portofolio
    try {
      const result = await dbClient.execute('SELECT * FROM portfolios ORDER BY created_at DESC');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      res.status(500).json({ error: 'Gagal mengambil data dari database' });
    }
  } 
  
  else if (req.method === 'POST') {
    // Tambah portofolio baru
    const { name, description, category, imageBase64, link } = req.body;

    if (!name || !description || !imageBase64 || !link) {
      return res.status(400).json({ error: 'Data tidak lengkap' });
    }

    try {
      // 1. Upload ke Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
        folder: 'web_porto',
      });
      const thumbnailUrl = uploadResponse.secure_url;

      // 2. Simpan ke Turso
      const id = Date.now().toString(); // Simple ID generation
      await dbClient.execute({
        sql: `INSERT INTO portfolios (id, name, description, category, thumbnail, link) 
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [id, name, description, category || 'Project', thumbnailUrl, link],
      });

      res.status(201).json({ message: 'Portofolio berhasil ditambahkan', id, thumbnail: thumbnailUrl });
    } catch (error) {
      console.error('Error uploading/saving:', error);
      res.status(500).json({ error: 'Gagal mengunggah gambar atau menyimpan data' });
    }
  } 
  
  else if (req.method === 'DELETE') {
    // Hapus portofolio
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'ID tidak disediakan' });
    }

    try {
      // Catatan: Jika ingin menghapus gambar dari Cloudinary juga, Anda bisa menambahkan logikanya di sini.
      // Namun untuk kesederhanaan, kita hanya hapus record di DB.
      
      await dbClient.execute({
        sql: 'DELETE FROM portfolios WHERE id = ?',
        args: [id],
      });

      res.status(200).json({ message: 'Portofolio berhasil dihapus' });
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      res.status(500).json({ error: 'Gagal menghapus data' });
    }
  } 
  
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
