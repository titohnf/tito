import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HalamanPersona } from "@/components/HalamanPersona";
import { cariPersona, daftarPersona } from "@/content/persona";
import { site } from "@/config/site";

type Props = { params: Promise<{ persona: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return daftarPersona.filter((p) => p.path !== "/").map((p) => ({ persona: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const persona = cariPersona((await params).persona);
  if (!persona) return {};
  const judul = `${site.nama} — ${persona.julukan}`;
  return {
    title: { absolute: judul },
    description: persona.deskripsiSeo,
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: persona.path,
      siteName: site.nama,
      title: judul,
      description: persona.deskripsiSeo,
    },
    twitter: { card: "summary_large_image", title: judul, description: persona.deskripsiSeo },
  };
}

export default async function HalamanPersonaLain({ params }: Props) {
  const persona = cariPersona((await params).persona);
  if (!persona) notFound();
  return <HalamanPersona persona={persona} />;
}
