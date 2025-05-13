urban-problem-solver/
├── app/
│ ├── layout.tsx
│ ├── page.tsx # Landing page
│ ├── report/
│ │ ├── page.tsx # Daftar laporan + peta
│ │ ├── new/page.tsx # Form buat laporan baru
│ │ └── [id]/page.tsx # Detail laporan
│ ├── profile/page.tsx # Profil user
│ ├── signin/page.tsx # Login
│ ├── api/
│ │ ├── auth/
│ │ │ ├── register/route.ts # POST
│ │ │ └── login/route.ts # POST
│ │ ├── report/
│ │ │ ├── route.ts # GET semua laporan, POST buat baru
│ │ │ └── [id]/route.ts # GET detail, PATCH update, DELETE
│ │ ├── vote/
│ │ │ └── [reportId]/route.ts # POST vote, GET total vote
│ │ ├── solution/
│ │ │ ├── route.ts # GET semua solusi
│ │ │ └── [reportId]/route.ts # POST solusi baru
│ │ └── stats/route.ts # Statistik global
│
├── components/
│ ├── ReportCard.tsx
│ ├── MapView.tsx
│ ├── ReportForm.tsx
│ ├── CommentBox.tsx
│ └── Navbar.tsx
│
├── lib/
│ ├── db.ts # MongoDB connection
│ ├── auth.ts # JWT, bcrypt, cookies
│ ├── middleware.ts # Middleware route protect (optional)
│ └── utils.ts # Helper functions
│
├── models/
│ ├── Report.ts
│ ├── User.ts
│ ├── Vote.ts
│ └── Solution.ts
│
├── public/ # Gambar statis, ikon
├── styles/
│ └── globals.css
├── .env
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
