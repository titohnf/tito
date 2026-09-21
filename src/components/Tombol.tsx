import Link from "next/link";
import styles from "./Tombol.module.css";

type Props = {
  href: string;
  children: React.ReactNode;
  varian?: "utama" | "garis" | "teks";
  eksternal?: boolean;
};

export function Tombol({ href, children, varian = "utama", eksternal }: Props) {
  const className = `${styles.tombol} ${styles[varian]}`;
  if (eksternal) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  // Tautan ke bagian lain di halaman yang sama (mis. "#bantuan"): pakai <a> biasa.
  // Lewat <Link>, router App Router menahan posisi scroll — hash-nya masuk ke URL
  // tapi halamannya tidak ikut melompat.
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
