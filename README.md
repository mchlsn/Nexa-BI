# NexaBI
Business Intelligence Platform untuk Customer Analytics dan Product Rcomendation pada Retail

Capstone Project - Pijak x Dicoding | Tim : PJK-GM040

------------------
## Deskripsi
NexaBI mengubah data retail mentah menjadu unsight yang actionable melalui:
- Dashboard Interaktif - Visualisasi real-time peforma penjualan
- Customer Segemntation - K-Means Clustering berasis RFM
- Market Basket Analysis - Apriori untuk rekimendasi produk

Dataset : Global Superstore Sales Dataset (51.290 Transaksi, 2012-2015)

---
## Tim
**Pembagian Peran dan Tanggung Jawab Tim (NexaBI)**
Dalam pengembangan platform NexaBI pada program Pijak x Dicoding, seluruh anggota tim memiliki peran strategis yang saling terintegrasi. Mulai dari pengolahan data, pemodelan kecerdasan buatan, pengembangan sistem, hingga proses deployment ke lingkungan produksi.

Berikut adalah rincian tanggung jawab dari masing-masing anggota tim:

- **Michael Sanjaya** (APC103D6Y0052) — Machine Learning
  Bertanggung jawab atas eksplorasi data (EDA) dan preprocessing dataset.

- **Irisaliya Irhabiyah Banat** (APC180D6X0405) — Machine Learning
  Bertanggung jawab atas customer segmentation (K-Means) dan market basket analysis (Apriori).

- **Muhromin** (APC284D6Y0023) — Backend
  Bertanggung jawab atas REST API dan manajemen database.

- **Ahmad Fauzul Adhim** (APC437D6Y0144) — Frontend
  Bertanggung jawab atas tampilan dashboard dan visualisasi chart interaktif.

- **Muhammad Daffa Amrullah** (APC284D6Y0432) — DevOps
  Bertanggung jawab atas CI/CD pipeline, Docker, dan deployment aplikasi.

## Struktur Repo
```
Nexa-BI/
├── frontend/       # React.js dashboard
├── backend/        # REST API Python
├── ml/             # Machine Learning pipeline
├── data/           # Dataset
├── docs/           # Dokumentasi
└── scripts/        # Script utilitas
```

## Tech Stack
- ML: Python, Pandas, Scikit-learn, MLxtend
- Backend: Python, FastAPI, PostgreSQL
- Frontend: React.js, Recharts
- DevOps: Docker, GitHub Actions