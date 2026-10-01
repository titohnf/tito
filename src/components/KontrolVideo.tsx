"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import styles from "./Portofolio.module.css";

/**
 * Tombol putar/jeda untuk video pratinjau di kartu yang sama (dicari lewat
 * <li> terdekat). Kapan video diputar otomatis diatur GeseranPortofolio;
 * tombol ini cuma membiarkan pengunjung memutar atau menjeda sendiri. Jeda
 * dari pengunjung ditandai `data-dijeda` di videonya supaya tidak diputar
 * lagi otomatis saat kartunya aktif kembali.
 */
export function KontrolVideo({ judul }: { judul: string }) {
  const tombolRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [main, setMain] = useState(false);

  useEffect(() => {
    const video = tombolRef.current?.closest("li")?.querySelector<HTMLVideoElement>("button video");
    if (!video) return;
    videoRef.current = video;
    const sinkron = () => setMain(!video.paused);
    sinkron();
    video.addEventListener("play", sinkron);
    video.addEventListener("pause", sinkron);
    return () => {
      video.removeEventListener("play", sinkron);
      video.removeEventListener("pause", sinkron);
    };
  }, []);

  const alih = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      delete v.dataset.dijeda;
      v.play().catch(() => {});
    } else {
      v.dataset.dijeda = "1";
      v.pause();
    }
  };

  return (
    <button
      ref={tombolRef}
      type="button"
      className={styles.kontrolVideo}
      onClick={alih}
      aria-label={`${main ? "Jeda" : "Putar"} video: ${judul}`}
    >
      {main ? <Pause size={14} fill="currentColor" strokeWidth={2.2} aria-hidden="true" /> : <Play size={14} fill="currentColor" strokeWidth={2.2} aria-hidden="true" />}
    </button>
  );
}
