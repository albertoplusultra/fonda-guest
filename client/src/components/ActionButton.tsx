/**
 * ActionButton — Botón de acción outline dorado, estándar del design system
 * Puede renderizarse como <button> o como <a> (cuando se pasa href)
 *
 * USO:
 *   <ActionButton onClick={fn}>Llamar al +34 919 891 469</ActionButton>
 *   <ActionButton href="tel:+34919891469" icon={<PhoneCall size={16} />}>Llamar</ActionButton>
 */
import { ps } from "@/lib/pageStyles";

interface ActionButtonBaseProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface ActionButtonAsButton extends ActionButtonBaseProps {
  href?: undefined;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  target?: undefined;
  rel?: undefined;
}

interface ActionButtonAsAnchor extends ActionButtonBaseProps {
  href: string;
  target?: string;
  rel?: string;
  onClick?: undefined;
  disabled?: undefined;
  type?: undefined;
}

type ActionButtonProps = ActionButtonAsButton | ActionButtonAsAnchor;

const sharedStyle: React.CSSProperties = {
  ...ps.actionButton,
  textDecoration: "none",
};

export default function ActionButton({ children, icon, href, target, rel, onClick, disabled, type, className, style }: ActionButtonProps) {
  const combined: React.CSSProperties = { ...sharedStyle, ...style };

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={`flex items-center justify-center gap-2.5 w-full rounded-sm transition-all duration-200 ${className ?? ""}`} style={combined}>
        {icon}
        {children}
      </a>
    );
  }

  return (
    <button type={type ?? "button"} onClick={onClick} disabled={disabled} className={`flex items-center justify-center gap-2.5 w-full rounded-sm transition-all duration-200 ${className ?? ""}`} style={combined}>
      {icon}
      {children}
    </button>
  );
}
