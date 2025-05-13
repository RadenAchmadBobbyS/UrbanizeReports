npm install mongodb bcrypt jsonwebtoken zod cookie
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p

npm install leaflet react-leaflet # Untuk peta

# API Endpoints Lengkap

# Auth

POST /api/auth/register → Daftar user baru

POST /api/auth/login → Login, return JWT + cookie

# Report (Masalah)

GET /api/report → Ambil semua laporan

POST /api/report → Kirim laporan baru

GET /api/report/:id → Detail laporan

PATCH /api/report/:id → Update status laporan

DELETE /api/report/:id → Hapus laporan

# Vote

POST /api/vote/:reportId → Vote laporan

GET /api/vote/:reportId → Jumlah vote

# Solusi

POST /api/solution/:reportId → Tambah solusi

GET /api/solution?reportId=xxx → Ambil semua solusi laporan

# Statistik

GET /api/stats → Jumlah laporan, kategori terbanyak, daerah terbanyak laporan, dll.
