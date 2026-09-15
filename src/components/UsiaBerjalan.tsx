"use client";

import { useEffect, useState } from "react";

const MS_PER_TAHUN = 365.2425 * 24 * 60 * 60 * 1000;

function hitungUsia(lahir: number) {
  return ((Date.now() - lahir) / MS_PER_TAHUN).toFixed(9);
}

/** Usia dalam tahun dengan 9 desimal, diperbarui terus. */
export function UsiaBerjalan({ tanggalLahir }: { tanggalLahir: string }) {
  const lahir = new Date(`${tanggalLahir}T00:00:00+07:00`).getTime();
  const [usia, setUsia] = useState(() => hitungUsia(lahir));

  useEffect(() => {
    const id = setInterval(() => setUsia(hitungUsia(lahir)), 50);
    return () => clearInterval(id);
  }, [lahir]);

  // Nilai dari server pasti beda beberapa milidetik dengan di browser — itu wajar
  return <span suppressHydrationWarning>{usia}</span>;
}
