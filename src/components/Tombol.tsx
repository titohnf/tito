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
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
