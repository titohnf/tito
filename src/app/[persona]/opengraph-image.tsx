import { gambarOg, ukuranOg } from "@/lib/og";
import { cariPersona, personaDefault } from "@/content/persona";

export const alt = "Tito Hanafi";
export const size = ukuranOg;
export const contentType = "image/png";

export default async function OgPersona({ params }: { params: Promise<{ persona: string }> }) {
  const persona = cariPersona((await params).persona) ?? personaDefault;
  return gambarOg(persona.julukan, persona.fakta);
}
