export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const providedToken = req.headers.authorization;
  const secretKey = process.env.ADMIN_SECRET_KEY;

  if (!secretKey) {
    // Jika user belum setup ADMIN_SECRET_KEY di Vercel, kita tolak
    return res.status(500).json({ error: 'Sistem belum dikonfigurasi sepenuhnya (Missing ADMIN_SECRET_KEY)' });
  }

  if (providedToken === secretKey) {
    res.status(200).json({ message: 'Akses diizinkan' });
  } else {
    res.status(401).json({ error: 'Kata sandi salah' });
  }
}
