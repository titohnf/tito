/**
 * Ikon 3D bersama. Sengaja SVG inline, bukan file gambar: ukurannya kecil, ikut
 * tema warna situs, dan tetap tajam di layar retina tanpa menambah permintaan
 * jaringan. Resepnya sama untuk semuanya — gradien untuk volume, kilau putih di
 * kiri-atas, bayangan jatuh, dan elips alas supaya ikonnya terasa mengambang.
 *
 * Dikumpulkan di satu berkas karena ikon yang sama dipakai di beberapa tempat
 * (mis. gelembung obrolan di kartu layanan dan di blok CTA). Kelasnya dioper
 * dari pemanggil, jadi tiap komponen tetap mengatur ukuran & animasinya sendiri.
 */

/** Gelembung obrolan — ajakan ngobrol. */
export function IkonNgobrol({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="gelembung" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6fd79a" />
          <stop offset="0.55" stopColor="#2f9e5b" />
          <stop offset="1" stopColor="#1f7742" />
        </linearGradient>
        <linearGradient id="gelembungKecil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dcdcd6" />
        </linearGradient>
        <radialGradient id="kilau" cx="0.35" cy="0.25" r="0.6">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="bayang" x="-25%" y="-25%" width="150%" height="160%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.2" floodColor="#121211" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* bayangan alas: bikin ikonnya terasa mengambang di atas kartu */}
      <ellipse cx="33" cy="56" rx="16" ry="3.2" fill="#121211" opacity="0.12" />

      {/* gelembung kecil di belakang, sebagai lawan bicara */}
      <g filter="url(#bayang)">
        <path
          d="M14 10h20a7 7 0 0 1 7 7v7a7 7 0 0 1-7 7H23l-7 5v-5h-2a7 7 0 0 1-7-7v-7a7 7 0 0 1 7-7Z"
          fill="url(#gelembungKecil)"
        />
      </g>

      {/* gelembung utama */}
      <g filter="url(#bayang)">
        <path
          d="M30 22h20a8 8 0 0 1 8 8v10a8 8 0 0 1-8 8h-3l1 7-9-7H30a8 8 0 0 1-8-8V30a8 8 0 0 1 8-8Z"
          fill="url(#gelembung)"
        />
        <path
          d="M30 22h20a8 8 0 0 1 8 8v10a8 8 0 0 1-8 8h-3l1 7-9-7H30a8 8 0 0 1-8-8V30a8 8 0 0 1 8-8Z"
          fill="url(#kilau)"
        />
      </g>

      <g fill="#ffffff">
        <circle cx="33" cy="35" r="2.6" />
        <circle cx="40" cy="35" r="2.6" />
        <circle cx="47" cy="35" r="2.6" />
      </g>
    </svg>
  );
}

/** Bohlam — kartu fun fact. */
export function IkonFakta({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="kaca" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#ffe9a3" />
          <stop offset="0.5" stopColor="#f6c445" />
          <stop offset="1" stopColor="#d99b16" />
        </linearGradient>
        <linearGradient id="fitting" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d6d5cf" />
          <stop offset="1" stopColor="#97968f" />
        </linearGradient>
        <radialGradient id="kilauKaca" cx="0.32" cy="0.28" r="0.5">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="bayangFakta" x="-25%" y="-25%" width="150%" height="160%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.2" floodColor="#121211" floodOpacity="0.22" />
        </filter>
      </defs>

      <ellipse cx="32" cy="57" rx="13" ry="2.8" fill="#121211" opacity="0.12" />

      <g filter="url(#bayangFakta)">
        {/* kaca bohlam */}
        <path
          d="M32 7c9.4 0 17 7.4 17 16.5 0 6.2-3.2 10.2-5.9 13.4-1.9 2.3-3.1 4-3.1 6.1v1H24v-1c0-2.1-1.2-3.8-3.1-6.1C18.2 33.7 15 29.7 15 23.5 15 14.4 22.6 7 32 7Z"
          fill="url(#kaca)"
        />
        <path
          d="M32 7c9.4 0 17 7.4 17 16.5 0 6.2-3.2 10.2-5.9 13.4-1.9 2.3-3.1 4-3.1 6.1v1H24v-1c0-2.1-1.2-3.8-3.1-6.1C18.2 33.7 15 29.7 15 23.5 15 14.4 22.6 7 32 7Z"
          fill="url(#kilauKaca)"
        />
        {/* fitting */}
        <rect x="24" y="45" width="16" height="4.4" rx="2.2" fill="url(#fitting)" />
        <rect x="25.5" y="50.6" width="13" height="4" rx="2" fill="url(#fitting)" />
      </g>

      {/* filamen */}
      <path
        d="M27.5 24.5c1.6-3.2 3-4.6 4.5-4.6s2.9 1.4 4.5 4.6"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.85"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Jendela peramban — layanan desain & pengembangan web. */
export function IkonWeb({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="ln-layar" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#7fb0ec" />
          <stop offset="0.55" stopColor="#3f7fd0" />
          <stop offset="1" stopColor="#2a5ea1" />
        </linearGradient>
        <linearGradient id="ln-kertas" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dcdcd6" />
        </linearGradient>
        <radialGradient id="ln-kilauLayar" cx="0.3" cy="0.22" r="0.65">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="ln-bayangWeb" x="-25%" y="-25%" width="150%" height="160%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.2" floodColor="#121211" floodOpacity="0.22" />
        </filter>
      </defs>

      <ellipse cx="33" cy="56" rx="16" ry="3.2" fill="#121211" opacity="0.12" />

      {/* lembar di belakang: kesan tumpukan rancangan */}
      <g filter="url(#ln-bayangWeb)">
        <rect x="8" y="9" width="30" height="22" rx="4" fill="url(#ln-kertas)" />
      </g>

      {/* jendela utama */}
      <g filter="url(#ln-bayangWeb)">
        <rect x="19" y="19" width="39" height="31" rx="5" fill="url(#ln-layar)" />
        <rect x="19" y="19" width="39" height="31" rx="5" fill="url(#ln-kilauLayar)" />
      </g>

      {/* bilah judul + tiga titik jendela */}
      <path
        d="M19 24a5 5 0 0 1 5-5h29a5 5 0 0 1 5 5v3H19v-3Z"
        fill="#ffffff"
        fillOpacity="0.28"
      />
      <g fill="#ffffff" fillOpacity="0.85">
        <circle cx="25" cy="23" r="1.5" />
        <circle cx="30" cy="23" r="1.5" />
        <circle cx="35" cy="23" r="1.5" />
      </g>

      {/* isi halaman */}
      <g fill="#ffffff" fillOpacity="0.9">
        <rect x="25" y="32" width="16" height="3" rx="1.5" />
        <rect x="25" y="38.5" width="26" height="3" rx="1.5" />
        <rect x="25" y="45" width="10" height="3" rx="1.5" />
      </g>
    </svg>
  );
}

/** Kaca pembesar di atas papan angka — layanan audit & optimalisasi. */
export function IkonAudit({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="ln-kaca" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#ffe9a3" />
          <stop offset="0.5" stopColor="#f6c445" />
          <stop offset="1" stopColor="#d99b16" />
        </linearGradient>
        <linearGradient id="ln-gagang" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d6d5cf" />
          <stop offset="1" stopColor="#8a8981" />
        </linearGradient>
        <linearGradient id="ln-papan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dcdcd6" />
        </linearGradient>
        <radialGradient id="ln-kilauKaca" cx="0.32" cy="0.28" r="0.55">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="ln-bayangAudit" x="-25%" y="-25%" width="150%" height="160%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.2" floodColor="#121211" floodOpacity="0.22" />
        </filter>
      </defs>

      <ellipse cx="32" cy="56" rx="15" ry="3.2" fill="#121211" opacity="0.12" />

      {/* papan angka yang sedang diperiksa */}
      <g filter="url(#ln-bayangAudit)">
        <rect x="9" y="12" width="30" height="34" rx="4" fill="url(#ln-papan)" />
      </g>
      <g fill="#c9c8c1">
        <rect x="15" y="33" width="4.5" height="7" rx="1.5" />
        <rect x="21.5" y="28" width="4.5" height="12" rx="1.5" />
        <rect x="28" y="23" width="4.5" height="17" rx="1.5" />
      </g>

      {/* gagang kaca pembesar */}
      <g filter="url(#ln-bayangAudit)">
        <rect
          x="39.5"
          y="40"
          width="7"
          height="17"
          rx="3.5"
          fill="url(#ln-gagang)"
          transform="rotate(-42 43 48)"
        />
        {/* lensa */}
        <circle cx="38" cy="30" r="14" fill="url(#ln-kaca)" fillOpacity="0.92" />
        <circle cx="38" cy="30" r="14" fill="url(#ln-kilauKaca)" />
        <circle cx="38" cy="30" r="14" fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2.5" />
      </g>
    </svg>
  );
}
