/**
 * =============================================================================
 *  SITE DATA — SATU-SATUNYA FILE UNTUK MENGUBAH SELURUH KONTEN WEBSITE
 * =============================================================================
 *  Ganti nilai di bawah ini sesuai kebutuhanmu. Tidak perlu menyentuh
 *  komponen halaman lain.
 *
 *  Format nomor WhatsApp: string angka saja, tanpa "+" dan tanpa spasi.
 *  Contoh: '6281234567890'  (62 = kode negara Indonesia)
 * ==========================================================================
 */

export const site = {
  url: 'https://muhammadraffi.dev',
  name: 'Muhammad Raffi Ar Rasyid',
  shortName: 'Raffi',
  initials: 'MR',
  role: 'Software Engineer & Creative Developer',
  tagline: 'Membangun produk digital yang segar seperti udara puncak gunung.',
  description:
    'Software engineer dan creative developer yang berfokus pada pembuatan website, aplikasi web, serta produk digital yang cepat, aksesibel, dan punya identitas visual kuat.',
  longDescription: [
    'Selama 7 tahun saya membantu startup, UMKM, dan klien korporat mengubah ide menjadi produk digital yang benar-benar dipakai. Pekerjaan saya membentang dari proses discovery, merancang arsitektur sistem, menulis kode, sampai pengujian dan peluncuran.',
    'Saya percaya produk yang bagus lahir dari perpaduan logika yang rapi dan rasa estetika yang kuat. Karena itu setiap proyek selalu saya mulai dengan memahami masalah, bukan langsung menulis kode.',
  ],
  location: {
    city: 'Bogor',
    province: 'Jawa Barat',
    country: 'Indonesia',
    full: 'Bogor, Jawa Barat, Indonesia',
    timezone: 'Asia/Jakarta (WIB)',
    mapQuery: 'Bogor, Jawa Barat, Indonesia',
  },
  email: 'veth021208@gmail.com',
  availability: {
    status: 'available',
    label: 'Tersedia untuk proyek baru',
    detail: 'Menerima 2 proyek baru untuk tiga bulan ke depan.',
  },
  stats: [
    { id: 'projects', value: 48, suffix: '+', label: 'Proyek Selesai', icon: 'Rocket' },
    { id: 'clients', value: 32, suffix: '', label: 'Klien Bahagia', icon: 'Users' },
    { id: 'experience', value: 7, suffix: 'th', label: 'Pengalaman', icon: 'Award' },
    { id: 'rating', value: 4.9, suffix: '/5', label: 'Rating Klien', icon: 'Star', decimals: 1 },
  ],
}

/** Nomor WhatsApp dalam format internasional tanpa tanda plus */
export const whatsapp = {
  number: '6281234567890',
  display: '+62 812-3456-7890',
  /** Pesan pembuka default ketika pengunjung mengeklik tombol WA */
  defaultMessage:
    'Halo Kak Raffi! Saya melihat portofolio kamu dan tertarik untuk bekerja sama. Boleh saya dapat informasi lebih lanjut?',
}

export const socials = [
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@muhammad.raffi',
    url: 'https://instagram.com/muhammad.raffi',
    icon: 'Instagram',
    color: '#E1306C',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'in/muhammadraffi',
    url: 'https://linkedin.com/in/muhammadraffi',
    icon: 'Linkedin',
    color: '#0A66C2',
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: '@muhammad-raffi',
    url: 'https://github.com/muhammad-raffi',
    icon: 'Github',
    color: '#181717',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    handle: '@muhammadraffi',
    url: 'https://youtube.com/@muhammadraffi',
    icon: 'Youtube',
    color: '#FF0000',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    handle: '@muhammad.raffi',
    url: 'https://tiktok.com/@muhammad.raffi',
    icon: 'Music2',
    color: '#111111',
  },
  {
    id: 'x',
    label: 'X / Twitter',
    handle: '@muhammad_raffi',
    url: 'https://x.com/muhammad_raffi',
    icon: 'Twitter',
    color: '#000000',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    handle: 'muhammad.raffi',
    url: 'https://facebook.com/muhammad.raffi',
    icon: 'Facebook',
    color: '#1877F2',
  },
  {
    id: 'email',
    label: 'Email',
    handle: 'veth021208@gmail.com',
    url: 'mailto:veth021208@gmail.com',
    icon: 'Mail',
    color: '#10B981',
  },
]

/** Navigasi utama — dipakai Navbar, Footer, dan Command Palette */
export const navigation = [
  { id: 'home', label: 'Beranda', href: '/', icon: 'Home' },
  { id: 'profile', label: 'Profil', href: '/profil', icon: 'User' },
  { id: 'products', label: 'Bakat', href: '/produk', icon: 'Layers' },
  { id: 'documentation', label: 'Dokumentasi', href: '/dokumentasi', icon: 'FolderGit2' },
  { id: 'contact', label: 'Kontak', href: '/kontak', icon: 'MessageCircle' },
]

/** Keahlian yang tampil di marquee beranda */
export const skillsMarquee = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'Vite',
  'Figma',
  'PostgreSQL',
  'MongoDB',
  'GraphQL',
  'Framer Motion',
  'Docker',
  'AWS',
  'Three.js',
]

/** Keahlian dengan persentase — untuk halaman Profil */
export const skillGroups = [
  {
    id: 'frontend',
    label: 'Frontend Engineering',
    icon: 'Layout',
    color: 'mint',
    items: [
      { name: 'React dan React Hooks', level: 95 },
      { name: 'Next.js / SSR', level: 88 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Motion / GSAP', level: 85 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend dan Data',
    icon: 'Server',
    color: 'sky',
    items: [
      { name: 'Node.js dan Express', level: 88 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'MongoDB', level: 86 },
      { name: 'REST dan GraphQL API', level: 88 },
      { name: 'Redis dan Caching', level: 75 },
    ],
  },
  {
    id: 'design',
    label: 'Desain dan Creative',
    icon: 'Palette',
    color: 'sun',
    items: [
      { name: 'Figma dan Design System', level: 90 },
      { name: 'Riset UI/UX', level: 82 },
      { name: 'Webflow', level: 78 },
      { name: 'Motion Design', level: 84 },
      { name: 'Ilustrasi Dasar', level: 70 },
    ],
  },
  {
    id: 'ops',
    label: 'DevOps dan Tooling',
    icon: 'Rocket',
    color: 'pine',
    items: [
      { name: 'Git dan GitHub Actions', level: 90 },
      { name: 'Docker', level: 80 },
      { name: 'Vercel / Netlify', level: 92 },
      { name: 'Testing (Vitest, RTL)', level: 84 },
      { name: 'Monitoring dan Analytics', level: 78 },
    ],
  },
]

/** Timeline pengalaman dan pendidikan — halaman Profil */
export const timeline = [
  {
    id: 'exp-1',
    period: '2023 — Sekarang',
    title: 'Lead Frontend Engineer',
    company: 'Nusantara Digital Studio',
    location: 'Bogor, Indonesia',
    type: 'work',
    description:
      'Memimpin tim frontend berisi 6 engineer untuk membangun platform SaaS yang dipakai lebih dari 40.000 pengguna. Skor Lighthouse naik dari 61 menjadi 98.',
    highlights: [
      'Membangun design system internal',
      'Migrasi monolith ke arsitektur micro-frontend',
      'Mentoring empat junior developer',
    ],
  },
  {
    id: 'exp-2',
    period: '2021 — 2023',
    title: 'Full-Stack Developer',
    company: 'TechBridge Labs',
    location: 'Jakarta, Indonesia',
    type: 'work',
    description:
      'Membangun aplikasi web untuk klien di sektor ritel dan keuangan. Menangani siklus penuh dari permintaan awal sampai deployment.',
    highlights: [
      '12 aplikasi web selesai',
      'Integrasi payment gateway lokal',
      'Optimasi query SQL hingga sepuluh kali lebih cepat',
    ],
  },
  {
    id: 'exp-3',
    period: '2020 — 2021',
    title: 'Junior Web Developer',
    company: 'Kreasi Debu Digital',
    location: 'Bogor, Indonesia',
    type: 'work',
    description:
      'Memulai perjalanan sebagai frontend developer di agency lokal. Banyak belajar langsung dari proyek klien dengan skala yang beragam.',
    highlights: ['20 lebih website klien', 'Belajar alur kerja agency', 'Setup CI/CD untuk pertama kali'],
  },
  {
    id: 'edu-1',
    period: '2017 — 2020',
    title: 'S1 Teknik Informatika',
    company: 'Universitas Telkom',
    location: 'Bogor, Indonesia',
    type: 'education',
    description:
      'Indeks Prestasi 3.72 dari 4.00. Skripsi terkait analisis performa aplikasi web dan strategi prefetching data.',
    highlights: ['Assistant Lecturer untuk mata kuliah pemrograman web', 'Aktif di komunitas mahasiswa teknologi'],
  },
]

/** ============ DOKUMENTASI PROYEK ============ */
export const projectCategories = [
  { id: 'all', label: 'Semua' },
  { id: 'web', label: 'Web App' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'design', label: 'Design System' },
  { id: 'dashboard', label: 'Dashboard' },
]

export const projects = [
  {
    id: 'prj-1',
    slug: 'tokoku-marketplace',
    title: 'Tokoku Marketplace UMKM',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce',
    client: 'Tokoku (Startup)',
    year: '2025',
    role: 'Lead Frontend Engineer',
    duration: '7 bulan',
    color: 'mint',
    cover: 'marketplace',
    featured: true,
    summary: 'Marketplace yang menghubungkan 12.000 UMKM lokal dengan pembeli di seluruh Jawa.',
    description:
      'Tokoku dibangun untuk membantu UMKM lokal yang selama ini sulit punya kanal penjualan online. Saya memimpin pengerjaan frontend dengan fokus pada kecepatan muat di jaringan lambat dan pengalaman belanja yang sederhana untuk pembeli.',
    challenge:
      'Sebagian besar seller berada di jaringan seluler dengan koneksi tidak stabil, sehingga halaman harus tetap ringan dan tetap bisa dipakai meski koneksi jelek.',
    solution:
      'Saya menerapkan strategi code splitting agresif, optimasi gambar dengan format WebP, dan cache offline-first berbasis service worker agar katalog produk tetap terlihat tanpa koneksi.',
    results: [
      { metric: 'Lighthouse', value: '99', label: 'Skor performa' },
      { metric: 'Load Time', value: '0.8s', label: 'Waktu muat' },
      { metric: 'GMV', value: '3.4x', label: 'Pertumbuhan transaksi' },
      { metric: 'Seller', value: '12.000+', label: 'UMPK terdaftar' },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    tags: ['Marketplace', 'Performance', 'Offline-first'],
    links: { live: 'https://tokoku.example.com', repo: null },
    gallery: 3,
  },
  {
    id: 'prj-2',
    slug: 'sehatku-health-platform',
    title: 'Sehatku Platform Kesehatan',
    category: 'dashboard',
    categoryLabel: 'Dashboard',
    client: 'Sehatku (HealthTech)',
    year: '2024',
    role: 'Full-Stack Developer',
    duration: '9 bulan',
    color: 'sky',
    cover: 'health',
    featured: true,
    summary: 'Platform telemedisin dengan 30.000 pasien aktif dan 500 dokter mitra.',
    description:
      'Aplikasi telemedisin yang menghubungkan pasien dengan dokter secara cepat. Saya menangani seluruh sisi frontend dan backend, mulai dari sistem antrean sampai rekam medis elektronik.',
    challenge:
      'Data medis bersifat sensitif dan wajib memenuhi regulasi privasi. Selain itu, ketersediaan layanan sangat penting karena dipakai untuk kebutuhan yang mendesak.',
    solution:
      'Seluruh komunikasi dienkripsi end-to-end, data sensitif dipisahkan di basis data khusus, dan setiap permintaan diverifikasi ulang dengan token akses berumur pendek.',
    results: [
      { metric: 'Pasien', value: '30.000+', label: 'Terdaftar' },
      { metric: 'Uptime', value: '99.98%', label: 'Ketersediaan' },
      { metric: 'Avg Time', value: '4.2min', label: 'Rata-rata antrean' },
      { metric: 'Dokter', value: '500+', label: 'Dokter mitra' },
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Redis', 'Docker'],
    tags: ['HealthTech', 'Telemedicine', 'Security'],
    links: { live: null, repo: null },
    gallery: 3,
  },
  {
    id: 'prj-3',
    slug: 'hikeindonesia',
    title: 'HikeIndonesia Panduan Mendaki',
    category: 'mobile',
    categoryLabel: 'Mobile',
    client: 'HikeIndonesia',
    year: '2024',
    role: 'Mobile Developer',
    duration: '5 bulan',
    color: 'sun',
    cover: 'hike',
    featured: true,
    summary: 'Aplikasi panduan mendaki gunung dengan 60.000 pengguna aktif.',
    description:
      'Aplikasi untuk pendaki gunung di Indonesia yang berisi panduan rute, cuaca terkini, dan fitur darurat. Aplikasi tetap berfungsi penuh di area tanpa sinyal.',
    challenge:
      'Area pendakian sering tanpa sinyal jaringan, padahal informasi cuaca dan posisi sangat dibutuhkan pada saat itu juga.',
    solution:
      'Semua data rute, peta topografi, dan panduan disimpan secara offline setelah unduhan pertama. Informasi cuaca disegarkan otomatis ketika koneksi tersedia.',
    results: [
      { metric: 'Pengguna', value: '60.000+', label: 'Pengguna aktif' },
      { metric: 'Rating', value: '4.8', label: 'Rating Google Play' },
      { metric: 'Peta', value: '140+', label: 'Puncak dipetakan' },
      { metric: 'SOS', value: '<10s', label: 'Waktu kirim lokasi' },
    ],
    stack: ['React Native', 'Expo', 'Firebase', 'Mapbox', 'Node.js'],
    tags: ['Mobile', 'Offline-first', 'Maps'],
    links: { live: 'https://hikeindonesia.app', repo: null },
    gallery: 3,
  },
  {
    id: 'prj-4',
    slug: 'kampusku-design-system',
    title: 'Kampusku Design System',
    category: 'design',
    categoryLabel: 'Design System',
    client: 'Universitas Nusantara',
    year: '2023',
    role: 'Design Systems Lead',
    duration: '8 bulan',
    color: 'mint',
    cover: 'designsystem',
    featured: false,
    summary: 'Design system terpadu untuk 12 aplikasi internal universitas.',
    description:
      'Membangun design system terpadu beserta component library yang dipakai 12 aplikasi internal universitas, mengurangi waktu pengembangan tiap fitur baru secara signifikan.',
    challenge:
      'Setiap tim punya cara berbeda membangun UI sehingga hasil antar aplikasi terlihat sangat tidak konsisten dan sulit dipelihara.',
    solution:
      'Saya menyusun design token, membangun component library di Figma, lalu mengimplementasikannya di kode dengan dokumentasi interaktif.',
    results: [
      { metric: 'Komponen', value: '120+', label: 'Komponen seragam' },
      { metric: 'Aplikasi', value: '12', label: 'Aplikasi terintegrasi' },
      { metric: 'Efisiensi', value: '40%', label: 'Penghematan waktu' },
      { metric: 'Aksesibilitas', value: 'AA', label: 'Standar WCAG' },
    ],
    stack: ['Figma', 'React', 'Tailwind CSS', 'Storybook', 'Radix UI'],
    tags: ['Design System', 'Figma', 'Accessibility'],
    links: { live: null, repo: 'https://github.com/muhammad-raffi/kampusku-ds' },
    gallery: 3,
  },
  {
    id: 'prj-5',
    slug: 'nitro-analytics',
    title: 'Nitro Platform Analytics',
    category: 'dashboard',
    categoryLabel: 'Dashboard',
    client: 'Nitro Labs',
    year: '2025',
    role: 'Frontend Engineer',
    duration: '6 bulan',
    color: 'sky',
    cover: 'analytics',
    featured: false,
    summary: 'Platform analitik real-time untuk data bisnis yang rumit.',
    description:
      'Dashboard analitik real-time yang memproses jutaan event per hari dan menampilkannya sebagai visualisasi yang mudah dipahami.',
    challenge:
      'Data datang sangat cepat sehingga dashboard harus mampu menampilkan ribuan titik data tanpa membuat browser terasa lambat.',
    solution:
      'Menggunakan virtualisasi list, downsampling data di Web Worker terpisah, dan interval pembaruan adaptif agar tampilan tetap halus.',
    results: [
      { metric: 'Event', value: '5M/hari', label: 'Event diproses' },
      { metric: 'Render', value: '60fps', label: 'Rendering halus' },
      { metric: 'Widget', value: '45', label: 'Jenis visualisasi' },
      { metric: 'Load', value: '1.2s', label: 'Waktu muat' },
    ],
    stack: ['React', 'D3.js', 'Web Workers', 'WebSocket', 'TimescaleDB'],
    tags: ['Data Viz', 'Real-time', 'WebSocket'],
    links: { live: 'https://nitrolabs.example.io', repo: null },
    gallery: 3,
  },
  {
    id: 'prj-6',
    slug: 'kopikita-pos',
    title: 'KopiKita Aplikasi Kasir POS',
    category: 'web',
    categoryLabel: 'Web App',
    client: 'KopiKita Group',
    year: '2023',
    role: 'Full-Stack Developer',
    duration: '4 bulan',
    color: 'sun',
    cover: 'pos',
    featured: false,
    summary: 'Aplikasi kasir untuk 85 outlet kopi dengan sinkronisasi offline.',
    description:
      'Aplikasi point of sale untuk jaringan kedai kopi dengan banyak cabang. Dapat bekerja penuh tanpa internet dan melakukan sinkronisasi otomatis saat koneksi kembali.',
    challenge:
      'Banyak outlet berada di lokasi dengan sinyal tidak stabil, tetapi transaksi tidak boleh berhenti ketika internet mati.',
    solution:
      'Seluruh data disimpan di IndexedDB secara lokal dengan antrean transaksi, lalu disinkronkan ke server ketika koneksi tersedia.',
    results: [
      { metric: 'Outlet', value: '85', label: 'Cabang aktif' },
      { metric: 'Transaksi', value: '250k', label: 'Transaksi per bulan' },
      { metric: 'Sinkronisasi', value: 'Otomatis', label: 'Saat online' },
      { metric: 'Efisiensi', value: '40 juta', label: 'Hemat stok per tahun' },
    ],
    stack: ['React', 'PWA', 'IndexedDB', 'Express', 'PostgreSQL'],
    tags: ['POS', 'PWA', 'Offline Sync'],
    links: { live: null, repo: null },
    gallery: 3,
  },
]

/** ============ FAQ ============ */
export const faqs = [
  {
    id: 'f1',
    question: 'Berapa lama pengerjaan sebuah proyek?',
    answer:
      'Tergantung kompleksitas. Landing page membutuhkan 1 sampai 2 minggu, company profile 2 sampai 4 minggu, sementara web app custom bisa memakan 6 sampai 12 minggu. Saya selalu memberikan estimasi timeline yang jelas di tahap awal.',
  },
  {
    id: 'f3',
    question: 'Apakah proyek bisa diubah di tengah jalan?',
    answer:
      'Sangat bisa. Semua proyek saya kerjakan dengan pendekatan iteratif. Di setiap akhir minggu ada demo yang bisa kamu coba dan beri masukan sebelum melangkah ke tahap berikutnya.',
  },
  {
    id: 'f4',
    question: 'Kode proyek diserahkan ke saya?',
    answer:
      'Tentu. Saat serah terima proyek, kamu menerima akses penuh repository GitHub beserta dokumentasi teknis dan panduan deployment. Tidak ada ikatan atau ketergantungan jangka panjang.',
  },
  {
    id: 'f5',
    question: 'Ada garansi setelah proyek selesai?',
    answer:
      'Ya. Untuk proyek web dan aplikasi saya memberikan garansi perbaikan bug gratis 3 sampai 6 bulan setelah peluncuran. Jika kamu butuh pendampingan maintenance jangka panjang, itu juga tersedia.',
  },
  {
    id: 'f6',
    question: 'Apakah bisa bekerja dari luar kota atau luar negeri?',
    answer:
      'Bisa, dan sebagian besar klien saya berada di luar kota. Komunikasi dilakukan melalui WhatsApp dan video call terjadwal, dengan laporan progress rutin dua kali dalam seminggu.',
  },
  {
    id: 'f7',
    question: 'Teknologi apa yang digunakan?',
    answer:
      'Untuk frontend saya memakai React dengan Tailwind CSS dan Motion. Backend memakai Node.js dengan PostgreSQL atau MongoDB. Deployment umumnya di Vercel, Netlify, atau AWS sesuai kebutuhan proyek.',
  },
]

/** ============ PROSES KERJA ============ */
export const processSteps = [
  {
    step: '01',
    title: 'Discovery dan Konsultasi',
    description:
      'Kita bicara tentang ide, masalah yang ingin diselesaikan, dan siapa target penggunanya. Gratis, tanpa ikatan.',
    icon: 'MessageSquare',
    duration: '1 sampai 2 hari',
  },
  {
    step: '02',
    title: 'Proposal dan Timeline',
    description:
      'Saya siapkan proposal berisi cakupan pekerjaan, rincian biaya, timeline bertahap, serta teknologi yang dipakai.',
    icon: 'FileText',
    duration: '2 sampai 3 hari',
  },
  {
    step: '03',
    title: 'Design dan Arsitektur',
    description:
      'Wireframe, desain visual, dan arsitektur teknis disusun sebelum satu baris kode ditulis.',
    icon: 'PenTool',
    duration: '1 sampai 3 minggu',
  },
  {
    step: '04',
    title: 'Pengembangan',
    description:
      'Coding berjalan dengan demo mingguan. Kamu bisa melihat progres nyata dan memberi masukan kapan saja.',
    icon: 'Code2',
    duration: '4 sampai 12 minggu',
  },
  {
    step: '05',
    title: 'Testing dan Peluncuran',
    description:
      'Pengujian lintas perangkat dan browser, perbaikan, lalu peluncuran ke server dengan monitoring aktif.',
    icon: 'Rocket',
    duration: '3 sampai 7 hari',
  },
  {
    step: '06',
    title: 'Dukungan Afterwards',
    description:
      'Garansi perbaikan bug gratis, dan pendampingan teknis bila kamu butuh bantuan perawatan.',
    icon: 'LifeBuoy',
    duration: '3 sampai 6 bulan',
  },
]

/** Pertanyaan cepat untuk Chat Widget */
export const quickReplies = [
  {
    id: 'q1',
    label: 'Jadwalkan proyek',
    message:
      'Halo Kak Raffi! Saya tertarik untuk mendiskusikan proyek baru. Boleh jadwalkan sesi konsultasi gratis?',
  },
  {
    id: 'q3',
    label: 'Tanya timeline',
    message:
      'Halo Kak Raffi! Saya sudah punya ide proyek dan ingin tahu estimasi waktu pengerjaannya. Boleh kita diskusikan?',
  },
  {
    id: 'q4',
    label: 'Tanya portofolio',
    message:
      'Halo Kak Raffi! Saya sedang menelusuri portofolio kamu dan ingin mendiskusikan kemungkinan kerja sama.',
  },
]

/** Pintasan untuk Command Palette */
export const quickLinks = [
  { id: 'ql1', label: 'Halaman Beranda', href: '/', icon: 'Home', group: 'Navigasi' },
  { id: 'ql2', label: 'Halaman Profil', href: '/profil', icon: 'User', group: 'Navigasi' },
  { id: 'ql3', label: 'Halaman Bakat', href: '/produk', icon: 'Layers', group: 'Navigasi' },
  { id: 'ql4', label: 'Dokumentasi Karya', href: '/dokumentasi', icon: 'FolderGit2', group: 'Navigasi' },
  { id: 'ql5', label: 'Hubungi Saya', href: '/kontak', icon: 'MessageCircle', group: 'Navigasi' },
  {
    id: 'ql6',
    label: 'Chat via WhatsApp',
    href: 'https://wa.me/6281234567890',
    icon: 'MessageCircle',
    group: 'Aksi',
    external: true,
  },
  {
    id: 'ql7',
    label: 'Unduh CV (PDF)',
    href: '/cv-muhammad-raffi-ar-rasyid.pdf',
    icon: 'Download',
    group: 'Aksi',
    download: true,
  },
  {
    id: 'ql8',
    label: 'Lihat Instagram',
    href: socials[0].url,
    icon: 'Instagram',
    group: 'Media Sosial',
    external: true,
  },
  {
    id: 'ql9',
    label: 'Lihat LinkedIn',
    href: socials[1].url,
    icon: 'Linkedin',
    group: 'Media Sosial',
    external: true,
  },
  {
    id: 'ql10',
    label: 'Lihat GitHub',
    href: socials[2].url,
    icon: 'Github',
    group: 'Media Sosial',
    external: true,
  },
  {
    id: 'ql11',
    label: 'Ganti Tema Terang atau Gelap',
    action: 'toggle-theme',
    icon: 'Moon',
    group: 'Preferensi',
  },
  {
    id: 'ql12',
    label: 'Salin Nomor WhatsApp',
    action: 'copy-wa',
    icon: 'Copy',
    group: 'Preferensi',
  },
]

/** ============ HELPER ============ */

/** Bangun tautan WhatsApp dengan pesan yang sudah terisi otomatis */
export const buildWhatsAppLink = (message = whatsapp.defaultMessage) =>
  `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(message)}`

export const helpers = {
  /** Ambil proyek berdasarkan slug */
  getProject: (slug) => projects.find((p) => p.slug === slug),
  /** Ambil proyek unggulan */
  getFeaturedProjects: () => projects.filter((p) => p.featured),
  /** Ambil proyek terkait berdasarkan kategori, dengan cadangan bila kurang */
  getRelatedProjects: (id, limit = 3) => {
    const source = projects.find((x) => x.id === id)
    if (!source) return []

    const sameCategory = projects.filter((p) => p.id !== id && p.category === source.category)
    if (sameCategory.length >= limit) return sameCategory.slice(0, limit)

    // Lengkapi dengan proyek lain agar bagian ini tidak pernah kosong
    const others = projects.filter((p) => p.id !== id && !sameCategory.includes(p))
    return [...sameCategory, ...others].slice(0, limit)
  },
  /** Ambil media sosial website saja, tanpa email */
  getWebSocials: () => socials.filter((s) => s.id !== 'email'),
}
