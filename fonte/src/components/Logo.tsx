import { LOGO_SRC } from "@/logo";

/** Logo original da Goleiros de Honra (selo do perfil @goleirosdehonra). */
export function Logo({ size = 120, className = "" }: { size?: number; src?: string; className?: string }) {
  return (
    <img
      src={LOGO_SRC}
      width={size}
      height={size}
      alt="Goleiros de Honra"
      className={`rounded-full ${className}`}
      style={{ aspectRatio: "1 / 1" }}
    />
  );
}
