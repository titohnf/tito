/**
 * Kartu di halaman /rekam-jejak. Format satu kartu:
 *   Tahun     → rentang tahun, mis. "2019–2022" atau "2023–sekarang"
 *   Kategori  → satu atau lebih segmen peran (jadi tag sekaligus penyaring)
 *   Judul     → nama proyek/peran, singkat
 *   Pencapaian→ SATU kalimat hasil konkret: angka, penghargaan, atau dampak nyata
 *   Href      → halaman detail/case study; kosongkan kalau belum ada,
 *               tautan "Lihat selengkapnya" otomatis tidak tampil
 *
 * TODO: isi `tahun` dan `pencapaian` yang masih kosong — keduanya baris paling
 * dibaca di kartu, dan sengaja tidak saya karang.
 */
import type { Segmen } from "./segmen";
import { faktaPelayan, membangunTera } from "./profil";

/** Rekan kerja di satu proyek. `linkedin` opsional — kalau ada, nama jadi tautan. */
export type AnggotaTim = { nama: string; peran?: string; linkedin?: string };

/** Satu tahapan di bagian "Proses". Isi sesuai yang benar-benar terjadi, tidak perlu
 *  lengkap riset → wireframe → testing kalau memang tidak semuanya dikerjakan. */
export type TahapProses = {
  judul: string;
  paragraf: string[];
  /** Screenshot/gambar pendukung; path di /public, mis. "/images/jsc-wireframe.png". */
  gambar?: { src: string; keterangan?: string }[];
};

/**
 * Halaman detail /rekam-jejak/[slug]. Bagian yang masih kosong tampil sebagai
 * "Sedang ditulis." — jadi aman dipublikasikan sambil dicicil.
 */
export type DetailProyek = {
  slug: string;
  /** Peran personal kamu, bukan peran tim. */
  peran?: string;
  /** Klien/institusi; kalau kosong dipakai `tim` dari kartu. */
  klien?: string;
  /** Komposisi tim ringkas, mis. "1 Researcher, 4 Designer, 1 Writer". */
  timRingkas?: string;
  /** Nama rekan kerja — tampil di Info Proyek (kalau `timRingkas` kosong) dan di Kredit. */
  tim?: AnggotaTim[];
  /** Link produk asli — hanya kalau publik dan masih aktif. */
  produk?: { label: string; href: string };
  /** Konteks: kondisi SEBELUM dikerjakan — masalahnya apa, kenapa perlu dibangun. */
  konteks?: string[];
  proses?: TahapProses[];
  /** Fakta terukur: angka, dampak, penghargaan. Bukan opini soal produknya. */
  hasil?: string[];
  /** Fun fact seputar proyek ini; tampil sebagai daftar bergeser di bawah Info Proyek. */
  funFakta?: string[];
  kredit?: string;
};

export type LaporanKerja = {
  tahun?: string;
  segmen?: Segmen[];
  judul: string;
  /** Instansi/tim, tampil kecil di bawah judul. */
  tim?: string;
  /** Gambar kartu (16:9); path di /public, mis. "/images/jaki-kartu.png". Kosong = placeholder. */
  gambar?: string;
  pencapaian?: string;
  /** Tautan manual (mis. ke situs luar). Diabaikan kalau `detail` ada. */
  href?: string;
  /** Isi ini untuk membuka halaman detail /rekam-jejak/[slug]. */
  detail?: DetailProyek;
};

export const laporanKerja: LaporanKerja[] = [
  {
    tahun: "2024-sekarang",
    segmen: ["perwakilan"],
    judul: "Membangun Rumah Pendidikan",
    tim: "Kemendikdasmen",
    gambar: "",
    pencapaian:
      "Menyatukan 8 ruang layanan pendidikan, menang Winner WSIS Prizes 2026 — pertama untuk Indonesia.",
    detail: {
      slug: "rumah-pendidikan",
      peran: "[PLACEHOLDER — peran spesifik di tim \"rumah\"-nya]",
      klien: "Kementerian Pendidikan Dasar dan Menengah",
      produk: { label: "rumah.pendidikan.go.id", href: "https://rumah.pendidikan.go.id" },
      konteks: [
        'Rumah Pendidikan menyatukan lebih dari 1.000 layanan pendidikan yang sebelumnya tersebar, jadi satu ekosistem terbagi 8 "ruang" (Ruang Murid, Ruang GTK, dst — masing-masing dikerjakan tim berbeda).',
      ],
      proses: [
        {
          judul: 'Merancang "Rumah"-nya',
          paragraf: [
            "Peran saya bukan mendesain isi tiap ruang, tapi bagaimana semua ruang itu bisa dinavigasi dari satu pintu masuk yang sama, tanpa bikin pengguna bingung harus ke mana dulu.",
            "[PLACEHOLDER — detail konkret keputusan desainnya seperti apa?]",
          ],
        },
      ],
      hasil: [
        "Winner WSIS Prizes 2026, kategori e-Government — pertama kalinya Indonesia meraih predikat ini sejak ajang ini diadakan tahun 2012.",
      ],
      kredit: "",
    },
  },
  {
    tahun: "2023-2024",
    segmen: ["perwakilan"],
    judul: "Memimpin Desain Fitur-fitur INAku",
    tim: "Peruri / INA Digital",
    gambar: "",
    pencapaian:
      "Memimpin desain fitur di salah satu super app nasional dengan 20+ layanan publik digital.",
    detail: {
      slug: "inaku",
      peran: "[PLACEHOLDER — Lead Designer? Berapa orang tim?]",
      klien: "Peruri / INA Digital",
      produk: { label: "inaku.go.id", href: "https://inaku.go.id" },
      konteks: ["[PLACEHOLDER — kondisi sebelum kamu masuk, atau tantangan spesifik yang dihadapi]"],
      proses: [
        {
          judul: "[PLACEHOLDER — fitur spesifik apa yang kamu pimpin desainnya? Bagaimana prosesnya?]",
          paragraf: [],
        },
      ],
      hasil: ["[PLACEHOLDER — rilis terbatas kapan, berapa fitur, dst]"],
      kredit: "",
    },
  },
  {
    tahun: "2022",
    segmen: ["perwakilan"],
    judul: "Redesain JAKI, Super App Jakarta",
    tim: "Jakarta Smart City",
    // TODO: taruh gambar kartu di /public/images, mis. gambar: "/images/jaki-kartu.png"
    gambar: "",
    pencapaian:
      "Memimpin redesain berbasis data yang membawa JAKI menang Champion WSIS Prizes 2021.",
    detail: {
      slug: "redesain-jaki",
      peran: "Lead Designer",
      klien: "Jakarta Smart City, Pemprov DKI Jakarta",
      timRingkas: "1 Researcher, 4 Designer, 1 Writer",
      // TODO: nama-nama rekan JSC untuk bagian Kredit.
      // { nama: "Nama rekan", peran: "Researcher", linkedin: "https://linkedin.com/in/…" },
      tim: [],
      produk: { label: "jaki.jakarta.go.id", href: "https://jaki.jakarta.go.id" },
      konteks: [
        "Di 2022, JAKI sudah punya lebih dari 30 fitur, tapi tampilannya udah nggak relevan — banyak warga bingung nyari layanan yang mereka butuhin di antara segudang menu.",
      ],
      proses: [
        {
          judul: "Menggali Data yang Sudah Ada",
          paragraf: [
            "Sebelum redesign, kami tarik data install-uninstall JAKI dari 2019-2022. Ternyata kebanyakan orang install JAKI cuma pas ada kebutuhan mendesak (misalnya pas pendaftaran vaksinasi), abis itu di-uninstall lagi.",
          ],
          // TODO: taruh grafik data install-uninstall di /public/images, lalu:
          // gambar: [{ src: "/images/jaki-data-install.png", keterangan: "Tren install-uninstall 2019-2022" }],
        },
        {
          judul: "Mendengar Langsung dari Ulasan Pengguna",
          paragraf: [
            "Kami scraping dan analisa sentimen dari ribuan ulasan di Playstore, dilanjut usability testing langsung ke pengguna, buat ngerti persis di mana titik bingungnya.",
          ],
          // TODO: screenshot proses/hasil riset.
        },
        {
          judul: "Merancang Ulang Navigasi",
          // TODO: ceritakan perubahan konkretnya — struktur menu baru, dst.
          paragraf: [],
          // TODO: screenshot before-after.
        },
      ],
      hasil: ["JAKI menang Champion di WSIS Prizes 2021, ajang penghargaan digital dari PBB."],
      kredit: "",
    },
  },
  {
    tahun: "2016-2018",
    segmen: ["perwakilan"],
    judul: "Awal Karier di Kominfo",
    tim: "Kominfo, sekarang Komdigi",
    gambar: "",
    pencapaian: "Belajar UI/UX otodidak sambil merangkap frontend dan desain grafis.",
    detail: {
      slug: "awal-karier-kominfo",
      peran: "UI Designer & Frontend Developer",
      klien: "Kementerian Komunikasi dan Informatika",
      konteks: [
        "Ini kerjaan pertama saya setelah lulus Ilmu Komputer. Belum punya pengalaman formal UI/UX — sebagian besar saya pelajari sambil jalan.",
      ],
      proses: [
        {
          judul:
            '[PLACEHOLDER — proyek/produk spesifik apa yang kamu kerjakan di sini? Kamu sempat sebut "desain grafis" juga — proyek apa?]',
          paragraf: [],
        },
      ],
      hasil: ["[PLACEHOLDER — ada capaian konkret dari masa ini yang layak disebut?]"],
      kredit: "",
    },
  },
  {
    // TODO: isi rentang tahun Tera (mis. "2021-sekarang").
    tahun: "",
    segmen: ["pelayan"],
    judul: "Membangun Tera Foundation",
    tim: "Tera Foundation",
    gambar: "",
    pencapaian:
      "Mendirikan yayasan pendidikan untuk anak marjinal, kini membina 50+ anak binaan.",
    detail: {
      slug: "tera",
      peran: "Pendiri",
      klien: "Tera Foundation",
      funFakta: faktaPelayan,
      konteks: [membangunTera.paragraf],
      // TODO: judul tahap di bawah masih usulan dari halaman /tera yang lama.
      // Screenshot sistem bimbel & website Tera bisa masuk lewat `gambar` di tahap terkait.
      proses: [
        { judul: "Kenapa desain saja tidak cukup", paragraf: [] },
        { judul: "Sistem internal untuk operasional bimbel", paragraf: [] },
        { judul: "Membangun website Tera", paragraf: [] },
      ],
      hasil: [],
      kredit: "",
    },
  },
];

/** Tautan kartu: halaman detail kalau ada, kalau tidak pakai `href` manual. */
export function tautanLaporan(l: LaporanKerja) {
  return l.detail ? `/rekam-jejak/${l.detail.slug}` : l.href;
}

/**
 * Kartu sorotan untuk satu bab di segmen Tentang: proyek dengan segmen yang
 * cocok dan sudah punya halaman detail, jadi kartunya selalu mengarah ke
 * /rekam-jejak/[slug] yang benar-benar ada.
 */
export function sorotanSegmen(segmen: string) {
  return laporanKerja
    .filter((l) => l.detail && l.segmen?.includes(segmen as Segmen))
    .map((l) => ({
      label: l.tim,
      judul: l.judul,
      teks: l.pencapaian,
      href: `/rekam-jejak/${l.detail!.slug}`,
      gambar: l.gambar || undefined,
    }));
}

/** Proyek yang punya halaman detail. */
export function laporanBerdetail() {
  return laporanKerja.filter((l): l is LaporanKerja & { detail: DetailProyek } => Boolean(l.detail));
}
