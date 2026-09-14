import type { Persona } from "@/content/persona";
import { Kepala } from "./Kepala";
import { Hero } from "./Hero";
import { Tentang } from "./Tentang";
import { KaryaPersona } from "./KaryaPersona";
import { Pikiran } from "./Pikiran";
import { CtaInteraktif } from "./CtaInteraktif";
import { PersonaLain } from "./PersonaLain";
import { Kaki } from "./Kaki";

/** Susunan halaman untuk satu persona. "Pikiran" & CTA sama di semua persona. */
export function HalamanPersona({ persona }: { persona: Persona }) {
  return (
    <>
      <Kepala dasar={persona.path} />
      <main>
        <Hero persona={persona} />
        <Tentang bab={persona.tentang} />
        <KaryaPersona persona={persona} />
        <Pikiran />
        <CtaInteraktif />
        <PersonaLain aktif={persona.id} />
      </main>
      <Kaki />
    </>
  );
}
