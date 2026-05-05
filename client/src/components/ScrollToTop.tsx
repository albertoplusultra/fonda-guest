/**
 * ScrollToTop — Resetea el scroll de la ventana al inicio en cada cambio de ruta.
 * Debe colocarse dentro del Router de Wouter.
 */
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return null;
}
