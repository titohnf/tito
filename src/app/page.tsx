import { HalamanPersona } from "@/components/HalamanPersona";
import { personaDefault } from "@/content/persona";

export default function Beranda() {
  return <HalamanPersona persona={personaDefault} />;
}
