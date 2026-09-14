import { gambarOg, ukuranOg } from "@/lib/og";
import { personaDefault } from "@/content/persona";

export const alt = `Tito Hanafi — ${personaDefault.julukan}`;
export const size = ukuranOg;
export const contentType = "image/png";

export default function OgImage() {
  return gambarOg(personaDefault.julukan, personaDefault.fakta);
}
