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
  role: 'Siswa & Web Developer',
  tagline: 'Membangun produk digital yang keren dan menarik.',
  greetings: ['Hai Minna', 'Selamat datang', 'Ini website portofolio saya', 'Enjoy guys'],
  description:
    'Siswa SMK jurusan Rekayasa Perangkat Lunak yang serius mendalami web development, dari website sekolah sampai proyek pribadi.',
  longDescription: [
    'Saya seorang siswa SMK jurusan Rekayasa Perangkat Lunak yang serius mendalami pengembangan web. Saya mulai belajar coding dari bangku sekolah dan kini sedang mempersiapkan diri untuk PKL. Selama belajar, saya mengerjakan proyek-proyek nyata seperti website tugas sekolah, site profil, dan aplikasi web kecil untuk komunitas sekitar.',
    'Saya percaya cara terbaik belajar adalah dengan langsung membangun sesuatu yang dipakai orang lain. Karena itu setiap proyek saya mulai dari masalah nyata, lalu saya selesaikan dengan kode yang rapi dan tampilan yang enak dilihat. Saya ingin terus berkembang lewat pengalaman PKL dan kolaborasi bersama tim profesional.',
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
  },
  stats: [
    { id: 'projects', value: 3, suffix: '+', label: 'Proyek Pribadi', icon: 'Rocket', color: 'mint' },
    { id: 'experience', value: 2, suffix: ' th', label: 'Belajar Coding', icon: 'Award', color: 'sun' },
    { id: 'tech', value: 6, suffix: '+', label: 'Teknologi Dipelajari', icon: 'Layers', color: 'sky' },
    { id: 'course', value: 2, suffix: '', label: 'Kursus Online', icon: 'GraduationCap', color: 'pine' },
  ],
}

/** Nomor WhatsApp dalam format internasional tanpa tanda plus */
export const whatsapp = {
  number: '6283898645908',
  display: '+62 838-9864-5908',
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

/** Navigasi utama — tautan jangkar ke bagian landing page */
export const navigation = [
  { id: 'home', label: 'Beranda', href: '#atas', icon: 'Home' },
  { id: 'profile', label: 'Tentang', href: '#tentang', icon: 'User' },
  { id: 'products', label: 'Keahlian', href: '#keahlian', icon: 'Layers' },
  { id: 'services', label: 'Layanan', href: '#layanan', icon: 'Briefcase' },
  { id: 'documentation', label: 'Karya', href: '#karya', icon: 'FolderGit2' },
  { id: 'contact', label: 'Kontak', href: '#kontak', icon: 'MessageCircle' },
]

/** Keahlian yang tampil di marquee beranda */
export const skillsMarquee = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Tailwind CSS',
  'PHP',
  'MySQL',
  'Git',
  'Figma',
  'Vite',
  'Vercel',
  'Responsive Design',
]

/** Keahlian dengan persentase — untuk halaman Profil */
export const skillGroups = [
  {
    id: 'frontend',
    label: 'Frontend Engineering',
    icon: 'Layout',
    color: 'mint',
    items: [
      { name: 'HTML dan CSS', level: 92 },
      { name: 'Responsive Design', level: 85 },
      { name: 'JavaScript', level: 80 },
      { name: 'Tailwind CSS', level: 80 },
      { name: 'React', level: 75 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend dan Data',
    icon: 'Server',
    color: 'sky',
    items: [
      { name: 'PHP', level: 70 },
      { name: 'MySQL', level: 70 },
      { name: 'REST API sederhana', level: 60 },
      { name: 'Node.js dasar', level: 50 },
    ],
  },
  {
    id: 'design',
    label: 'Desain dan Creative',
    icon: 'Palette',
    color: 'sun',
    items: [
      { name: 'Figma', level: 75 },
      { name: 'Wireframe dan Prototipe', level: 70 },
      { name: 'Konsistensi Visual', level: 65 },
      { name: 'Ilustrasi Dasar', level: 55 },
    ],
  },
  {
    id: 'ops',
    label: 'DevOps dan Tooling',
    icon: 'Rocket',
    color: 'pine',
    items: [
      { name: 'Git dan GitHub', level: 80 },
      { name: 'Deploy ke Vercel / Netlify', level: 70 },
      { name: 'Hosting dan Domain', level: 65 },
      { name: 'Command Line dasar', level: 55 },
    ],
  },
]

/** Layanan unggulan — pratinjau di Beranda dan structured data SEO */
export const services = [
  {
    id: 'srv-1',
    slug: 'landing-page',
    title: 'Landing Page & Website Profil',
    short:
      'Website satu halaman yang ringan dan menarik untuk memperkenalkan diri, usaha kecil, atau sebuah acara.',
    icon: 'Layout',
    color: 'mint',
    popular: true,
    features: [
      'Desain responsif mobile-first',
      'Tombol WhatsApp dan peta lokasi',
      'Optimasi gambar agar cepat dimuat',
      'Gratis revisi minor',
    ],
    price: 'Mulai Rp300 rb',
    duration: '3 sampai 7 hari',
  },
  {
    id: 'srv-2',
    slug: 'website-acara',
    title: 'Website Acara & Sekolah',
    short:
      'Website untuk event, OSIS, ekstrakurikuler, atau kegiatan sekolah: jadwal, daftar peserta, dan informasi penting.',
    icon: 'LayoutDashboard',
    color: 'sky',
    popular: false,
    features: [
      'Halaman jadwal dan rundown acara',
      'Form pendaftaran via WhatsApp',
      'Galeri foto sederhana',
      'Mudah diperbarui panitia',
    ],
    price: 'Mulai Rp400 rb',
    duration: '1 sampai 2 minggu',
  },
  {
    id: 'srv-3',
    slug: 'katalog-umkm',
    title: 'Katalog Produk UMKM',
    short:
      'Katalog produk online untuk usaha kecil, lengkap dengan tombol pesan langsung ke WhatsApp pemilik.',
    icon: 'Palette',
    color: 'sun',
    popular: false,
    features: [
      'Daftar produk dengan foto dan harga',
      'Tombol pesan langsung ke WhatsApp',
      'Kategori dan pencarian sederhana',
      'Tampilan rapi di HP dan desktop',
    ],
    price: 'Mulai Rp500 rb',
    duration: '2 sampai 3 minggu',
  },
  {
    id: 'srv-4',
    slug: 'setup-hosting',
    title: 'Setup Hosting & Domain',
    short:
      'Bantuan membeli domain, menyewa hosting, dan memasang website sampai bisa diakses dari internet.',
    icon: 'Server',
    color: 'pine',
    popular: false,
    features: [
      'Rekomendasi domain dan hosting',
      'Konfigurasi DNS dan SSL',
      'Deploy website ke server',
      'Panduan kelola sendiri',
    ],
    price: 'Mulai Rp150 rb',
    duration: '1 hari',
  },
  {
    id: 'srv-5',
    slug: 'perbaikan-optimasi',
    title: 'Perbaikan & Optimasi Website',
    short:
      'Website lemot, error, atau butuh penyesuaian kecil? Saya bantu perbaiki dan percepat.',
    icon: 'Gauge',
    color: 'mint',
    popular: false,
    features: [
      'Audit kecepatan dengan Lighthouse',
      'Perbaikan tampilan yang rusak',
      'Optimasi gambar dan loading',
      'Laporan perbaikan yang jelas',
    ],
    price: 'Mulai Rp150 rb',
    duration: '2 sampai 5 hari',
  },
  {
    id: 'srv-6',
    slug: 'desain-ui-figma',
    title: 'Desain UI di Figma',
    short:
      'Desain tampilan aplikasi atau website di Figma sebelum masuk tahap coding, bisa dipakai sendiri atau dikerjakan berdua.',
    icon: 'Smartphone',
    color: 'sky',
    popular: false,
    features: [
      'Wireframe dan desain visual',
      'Desain mobile dan desktop',
      'Komponen yang siap dipindah ke kode',
      'File Figma diserahkan sepenuhnya',
    ],
    price: 'Mulai Rp200 rb',
    duration: '3 sampai 5 hari',
  },
]

/** Timeline pengalaman dan pendidikan — halaman Profil */
export const timeline = [
  {
    id: 'edu-1',
    period: '2024 — Sekarang',
    title: 'SMK Jurusan Rekayasa Perangkat Lunak',
    company: 'Kelas RPL',
    location: 'Bogor, Indonesia',
    type: 'education',
    description:
      'Sedang menempuh pendidikan di jurusan Rekayasa Perangkat Lunak sambil terus berlatih membangun website dan aplikasi web secara mandiri maupun untuk tugas sekolah.',
    highlights: [
      'Fokus pada pemrograman web dan basis data',
      'Mengerjakan proyek sekolah dengan React dan PHP',
      'Aktif di ekstrakurikuler atau komunitas teknologi',
    ],
  },
  {
    id: 'exp-1',
    period: '2026 — Sekarang',
    title: 'PKL / Magang Web Developer',
    company: 'Isi dengan tempat PKL Anda',
    location: 'Indonesia',
    type: 'work',
    description:
      'Rencana menjalani Praktik Kerja Lapangan sebagai web developer. Ingin belajar langsung dari tim profesional, memahami alur kerja proyek nyata, dan berkontribusi pada website atau aplikasi yang dipakai pengguna sungguhan.',
    highlights: [
      'Belajar alur kerja tim dan version control',
      'Membantu pengembangan fitur website perusahaan',
      'Mendokumentasikan kode dan hasil kerja',
    ],
  },
  {
    id: 'exp-2',
    period: '2025 — Sekarang',
    title: 'Freelance Web Developer',
    company: 'Proyek kecil untuk kenalan dan komunitas',
    location: 'Bogor, Indonesia',
    type: 'work',
    description:
      'Membuat website sederhana untuk kebutuhan kecil di sekitar saya, seperti site profil, landing page acara, dan katalog produk UMKM, sambil terus memperbaiki kualitas kode dan desain.',
    highlights: [
      'Membuat landing page untuk acara sekolah',
      'Membantu UMKM memasarkan produk lewat website',
      'Belajar hosting, domain, dan deployment sendiri',
    ],
  },
  {
    id: 'exp-3',
    period: '2024 — 2025',
    title: 'Proyek Sekolah dan Pribadi',
    company: 'Belajar lewat praktik langsung',
    location: 'Bogor, Indonesia',
    type: 'work',
    description:
      'Kumpulan proyek yang saya kerjakan saat belajar: aplikasi absensi sederhana, website profil sekolah, dan berbagai latihan kecil yang saya pelajari secara mandiri lewat dokumentasi dan tutorial.',
    highlights: [
      'Aplikasi absensi berbasis web untuk tugas sekolah',
      'Website profil sekolah dengan React dan Tailwind CSS',
      'Latihan harian di GitHub untuk menjaga konsistensi',
    ],
  },
]

/** ============ DOKUMENTASI PROYEK ============ */
export const projectCategories = [
  { id: 'all', label: 'Semua' },
  { id: 'web', label: 'Web App' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'design', label: 'Desain UI' },
  { id: 'dashboard', label: 'Dashboard' },
]

export const projects = [
  {
    id: 'prj-1',
    slug: 'website-profil-sekolah',
    title: 'Website Profil Sekolah',
    category: 'web',
    categoryLabel: 'Web App',
    client: 'Proyek Sekolah',
    year: '2025',
    role: 'Web Developer',
    duration: '2 minggu',
    color: 'mint',
    cover: 'pos',
    featured: true,
    summary: 'Website profil sekolah berisi informasi jurusan, prestasi, dan galeri foto kegiatan.',
    description:
      'Website profil sederhana yang saya buat sebagai proyek sekolah untuk memperkenalkan jurusan Rekayasa Perangkat Lunak. Berisi informasi umum sekolah, daftar prestasi, galeri kegiatan, dan kontak yang bisa dihubungi lewat WhatsApp.',
    challenge:
      'Website harus tetap ringan karena banyak diakses dari HP dengan jaringan biasa, sekaligus mudah diperbarui oleh guru tanpa harus paham coding.',
    solution:
      'Saya membangunnya dengan React dan Tailwind CSS, memisahkan konten ke file data terpisah, dan mengoptimasi gambar supaya tetap cepat dimuat di jaringan sekolah.',
    results: [
      { metric: 'Lighthouse', value: '98', label: 'Skor performa' },
      { metric: 'Load', value: '1.1s', label: 'Waktu muat' },
      { metric: 'Halaman', value: '5', label: 'Halaman informasi' },
      { metric: 'HP', value: '100%', label: 'Responsif di mobile' },
    ],
    stack: ['React', 'Tailwind CSS', 'Vite', 'JavaScript'],
    tags: ['Website Sekolah', 'Responsif', 'Performance'],
    links: { live: null, repo: null },
    gallery: 3,
  },
  {
    id: 'prj-2',
    slug: 'katalog-produk-umkm',
    title: 'Katalog Produk UMKM',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce',
    client: 'UMKM Lokal',
    year: '2025',
    role: 'Web Developer',
    duration: '3 minggu',
    color: 'sky',
    cover: 'marketplace',
    featured: true,
    summary: 'Katalog produk online untuk UMKM, lengkap dengan tombol pesan langsung ke WhatsApp.',
    description:
      'Membantu UMKM di sekitar saya memasarkan produk lewat website katalog. Setiap produk punya foto, harga, dan deskripsi, serta tombol yang langsung membuka WhatsApp pemilik untuk pemesanan.',
    challenge:
      'Pemilik usaha tidak punya sistem pembayaran online dan hanya ingin pelanggan langsung menghubungi mereka, jadi alurnya harus sesederhana mungkin.',
    solution:
      'Saya buat katalog statis dengan pencarian dan filter kategori, lalu setiap produk diberi tombol pesan yang otomatis mengirim nama produk ke WhatsApp pemilik.',
    results: [
      { metric: 'Produk', value: '40+', label: 'Produk terdaftar' },
      { metric: 'Mitra', value: '3', label: 'UMKM terbantu' },
      { metric: 'Pesan', value: '150+', label: 'Pesan via WhatsApp' },
      { metric: 'Load', value: '1.2s', label: 'Waktu muat' },
    ],
    stack: ['React', 'Tailwind CSS', 'JavaScript', 'Vercel'],
    tags: ['UMKM', 'Katalog', 'WhatsApp Order'],
    links: { live: null, repo: null },
    gallery: 3,
  },
  {
    id: 'prj-3',
    slug: 'aplikasi-absensi-sederhana',
    title: 'Aplikasi Absensi Sederhana',
    category: 'dashboard',
    categoryLabel: 'Dashboard',
    client: 'Proyek Sekolah',
    year: '2025',
    role: 'Full-Stack Developer',
    duration: '3 minggu',
    color: 'sun',
    cover: 'analytics',
    featured: true,
    summary: 'Aplikasi absensi berbasis web untuk tugas sekolah, lengkap dengan rekap kehadiran otomatis.',
    description:
      'Aplikasi absensi yang saya buat untuk tugas mata pelajaran pemrograman web. Guru bisa mencatat kehadiran siswa, dan sistem otomatis membuat rekap harian serta bulanan dalam bentuk tabel yang bisa diekspor.',
    challenge:
      'Data absensi harus akurat dan rekap harus bisa dibuat otomatis tanpa perlu hitung manual, namun tetap sederhana untuk dipakai guru yang tidak terbiasa dengan aplikasi.',
    solution:
      'Menggunakan PHP dan MySQL untuk sisi server, form absensi yang sederhana, serta fitur rekap otomatis berdasarkan tanggal yang bisa diekspor ke Excel.',
    results: [
      { metric: 'Siswa', value: '320', label: 'Siswa terdata' },
      { metric: 'Absen', value: '5 dtk', label: 'Waktu mencatat' },
      { metric: 'Rekap', value: 'Otomatis', label: 'Rekap harian' },
      { metric: 'Nilai', value: '90', label: 'Nilai tugas sekolah' },
    ],
    stack: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
    tags: ['Absensi', 'Dashboard', 'Sekolah'],
    links: { live: null, repo: null },
    gallery: 3,
  },
  {
    id: 'prj-4',
    slug: 'landing-page-acara-sekolah',
    title: 'Landing Page Acara Sekolah',
    category: 'web',
    categoryLabel: 'Web App',
    client: 'Panitia Kegiatan Sekolah',
    year: '2026',
    role: 'Web Developer',
    duration: '1 minggu',
    color: 'pine',
    cover: 'default',
    featured: false,
    summary: 'Landing page event sekolah dengan rundown, galeri, dan form pendaftaran via WhatsApp.',
    description:
      'Landing page satu halaman untuk mempromosikan kegiatan sekolah. Berisi informasi acara, rundown per hari, galeri foto kegiatan sebelumnya, dan tombol pendaftaran yang terhubung ke WhatsApp panitia.',
    challenge:
      'Acara hanya beberapa minggu lagi, jadi website harus selesai cepat dan pendaftarannya mudah diikuti siswa dari HP masing-masing.',
    solution:
      'Saya buat landing page satu halaman yang ringan dengan fokus pada informasi penting, lalu form pendaftaran dialihkan ke WhatsApp agar panitia mudah mencatat peserta.',
    results: [
      { metric: 'Pendaftar', value: '120+', label: 'Siswa terdaftar' },
      { metric: 'Waktu', value: '5 hari', label: 'Waktu pengerjaan' },
      { metric: 'Lighthouse', value: '99', label: 'Skor performa' },
      { metric: 'Ukuran', value: '<200kb', label: 'Ukuran halaman' },
    ],
    stack: ['React', 'Tailwind CSS', 'Vite'],
    tags: ['Landing Page', 'Acara', 'Fast Delivery'],
    links: { live: null, repo: null },
    gallery: 3,
  },
  {
    id: 'prj-5',
    slug: 'sistem-perpustakaan-mini',
    title: 'Sistem Perpustakaan Mini',
    category: 'dashboard',
    categoryLabel: 'Dashboard',
    client: 'Proyek Sekolah',
    year: '2026',
    role: 'Full-Stack Developer',
    duration: '4 minggu',
    color: 'sky',
    cover: 'health',
    featured: false,
    summary: 'Sistem pencatatan buku dan peminjaman perpustakaan sederhana berbasis web.',
    description:
      'Sistem informasi perpustakaan sederhana untuk mengelola katalog buku, mencatat peminjaman dan pengembalian, serta menampilkan daftar buku yang belum dikembalikan beserta tenggatnya.',
    challenge:
      'Banyak buku tercecer catatannya karena selama ini masih menggunakan buku tamu manual, sehingga sering lupa siapa yang meminjam apa.',
    solution:
      'Saya buat aplikasi web dengan login admin, CRUD buku, form peminjaman, dan dashboard yang menampilkan buku terlambat dikembalikan agar bisa ditagih.',
    results: [
      { metric: 'Buku', value: '800+', label: 'Judul terdata' },
      { metric: 'Peminjaman', value: '200+', label: 'Catatan peminjaman' },
      { metric: 'Admin', value: '3', label: 'Petugas terdaftar' },
      { metric: 'Waktu', value: '4 mgg', label: 'Pengerjaan' },
    ],
    stack: ['PHP', 'MySQL', 'Bootstrap'],
    tags: ['Perpustakaan', 'CRUD', 'Sekolah'],
    links: { live: null, repo: null },
    gallery: 3,
  },
  {
    id: 'prj-6',
    slug: 'desain-form-absensi-figma',
    title: 'Desain UI Form Absensi di Figma',
    category: 'design',
    categoryLabel: 'Desain UI',
    client: 'Proyek Pribadi',
    year: '2025',
    role: 'UI Designer',
    duration: '4 hari',
    color: 'sun',
    cover: 'designsystem',
    featured: false,
    summary: 'Desain antarmuka aplikasi absensi di Figma sebelum dijadikan versi web.',
    description:
      'Sebelum mengcoding aplikasi absensi, saya mendesain seluruh alurnya di Figma: layar login, form absensi, rekap kehadiran, dan tampilan admin. Desainnya saya buat mobile-first agar nyaman dipakai siswa.',
    challenge:
      'Alur absensi terlihat sederhana tapi banyak kasus khusus, seperti siswa terlambat atau izin, sehingga alurnya harus dipikirkan matang sebelum mulai coding.',
    solution:
      'Saya membuat wireframe dulu, lalu desain visual dengan komponen yang konsisten, dan mencoba alurnya langsung di Figma prototype sebelum dikerjakan di kode.',
    results: [
      { metric: 'Layar', value: '6', label: 'Layar didesain' },
      { metric: 'Komponen', value: '15+', label: 'Komponen Figma' },
      { metric: 'Prototipe', value: 'Interaktif', label: 'Bisa dicoba langsung' },
      { metric: 'Durasi', value: '4 hari', label: 'Waktu desain' },
    ],
    stack: ['Figma', 'UI Design', 'Wireframe'],
    tags: ['UI Design', 'Figma', 'Mobile First'],
    links: { live: null, repo: null },
    gallery: 3,
  },
]

/** ============ FAQ ============ */
export const faqs = [
  {
    id: 'f1',
    question: 'Menerima proyek kecil juga?',
    answer:
      'Ya, justru proyek kecil adalah fokus saya sekarang. Website acara sekolah, katalog UMKM, atau tugas kuliah dan sekolah semuanya saya kerjakan dengan serius dan komunikasi yang jelas.',
  },
  {
    id: 'f3',
    question: 'Berapa biaya jasa website?',
    answer:
      'Mulai dari Rp300 ribu untuk landing page sederhana. Biaya akhir tergantung jumlah halaman dan fitur yang dibutuhkan. Saya selalu kasih perkiraan biaya di awal sebelum mulai mengerjakan.',
  },
  {
    id: 'f4',
    question: 'Bagaimana proses pengerjaannya?',
    answer:
      'Pertama kita diskusi kebutuhannya lewat WhatsApp. Lalu saya buatkan desain atau struktur halaman, lanjut coding, dan terakhir serah terima beserta panduan cara mengelolanya. Selama pengerjaan ada update berkala.',
  },
  {
    id: 'f5',
    question: 'Bisa kerja remote dari luar kota?',
    answer:
      'Bisa. Sebagian besar proyek saya kerjakan online lewat WhatsApp, Google Meet, dan GitHub. Komunikasi jadi tetap lancar meski kita berbeda kota.',
  },
  {
    id: 'f6',
    question: 'Teknologi apa yang dipakai?',
    answer:
      'Untuk website saya biasa memakai React, Tailwind CSS, dan Vite. Untuk aplikasi yang butuh database saya memakai PHP atau Node.js dengan MySQL. Desain UI saya kerjakan di Figma.',
  },
  {
    id: 'f7',
    question: 'Apakah sedang menerima PKL?',
    answer:
      'Ya, saya sedang mempersiapkan diri untuk menjalani PKL di bidang web development. Saya antusias belajar langsung dari tim profesional dan siap berkontribusi. Silakan hubungi saya untuk berdiskusi lebih lanjut.',
  },
]

/** ============ PROSES KERJA ============ */
export const processSteps = [
  {
    step: '01',
    title: 'Diskusi Kebutuhan',
    description:
      'Kita bicara tentang ide, target pengguna, dan fitur yang dibutuhkan. Gratis, tanpa ikatan.',
    icon: 'MessageSquare',
    duration: '1 sampai 2 hari',
  },
  {
    step: '02',
    title: 'Rancangan dan Estimasi',
    description:
      'Saya siapkan rancangan halaman, pilihan fitur, serta perkiraan biaya dan waktu pengerjaan sebelum mulai.',
    icon: 'FileText',
    duration: '1 sampai 2 hari',
  },
  {
    step: '03',
    title: 'Desain dan Struktur',
    description:
      'Wireframe dan desain visual disusun lebih dulu agar hasilnya sesuai harapan sebelum masuk tahap coding.',
    icon: 'PenTool',
    duration: '2 sampai 5 hari',
  },
  {
    step: '04',
    title: 'Pengembangan',
    description:
      'Saya kerjakan website atau aplikasinya, lengkap dengan update progres berkala lewat WhatsApp.',
    icon: 'Code2',
    duration: '1 sampai 3 minggu',
  },
  {
    step: '05',
    title: 'Uji Coba dan Peluncuran',
    description:
      'Website diuji di HP dan desktop, diperbaiki bila ada masalah, lalu dipasang online sampai bisa diakses.',
    icon: 'Rocket',
    duration: '2 sampai 3 hari',
  },
  {
    step: '06',
    title: 'Bimbingan dan Perbaikan',
    description:
      'Setelah serah terima, saya bantu menjelaskan cara mengelola website dan memperbaiki bila ada yang kurang.',
    icon: 'LifeBuoy',
    duration: '30 hari pendampingan',
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
  { id: 'ql1', label: 'Ke Beranda', href: '#atas', icon: 'Home', group: 'Navigasi' },
  { id: 'ql2', label: 'Tentang Saya', href: '#tentang', icon: 'User', group: 'Navigasi' },
  { id: 'ql3', label: 'Keahlian', href: '#keahlian', icon: 'Layers', group: 'Navigasi' },
  { id: 'ql4', label: 'Layanan', href: '#layanan', icon: 'Briefcase', group: 'Navigasi' },
  { id: 'ql5', label: 'Karya', href: '#karya', icon: 'FolderGit2', group: 'Navigasi' },
  { id: 'ql6', label: 'Hubungi Saya', href: '#kontak', icon: 'MessageCircle', group: 'Navigasi' },
  {
    id: 'ql6',
    label: 'Chat via WhatsApp',
    href: `https://wa.me/${whatsapp.number}`,
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
}
