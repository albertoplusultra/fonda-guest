/**
 * InlineLink — Enlace o botón inline con estilo dorado del design system
 * Úsalo dentro de párrafos de texto para acciones contextuales
 *
 * USO como botón:
 *   <InlineLink onClick={fn}>llame a recepción</InlineLink>
 *
 * USO como enlace:
 *   <InlineLink href="tel:+34919891469">+34 919 891 469</InlineLink>
 */
import { ps } from "@/lib/pageStyles";

interface InlineLinkProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function InlineLink({ children, href, onClick, target, rel, className, style }: InlineLinkProps) {
  const combined: React.CSSProperties = { ...ps.inlineLink, ...style };

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={className} style={combined}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className} style={combined}>
      {children}
    </button>
  );
}
