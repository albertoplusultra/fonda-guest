import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => toggleTheme()}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        borderRadius: "50%",
        border: `1px solid ${isDark ? "rgba(201,169,110,0.5)" : "rgba(90,65,30,0.35)"}`,
        background: isDark ? "rgba(201,169,110,0.08)" : "rgba(90,65,30,0.06)",
        color: isDark ? "#C9A96E" : "#5A411E",
        transition: "all 0.2s ease",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      {isDark ? (
        <Sun size={16} strokeWidth={1.5} />
      ) : (
        <Moon size={16} strokeWidth={1.5} />
      )}
    </button>
  );
}
