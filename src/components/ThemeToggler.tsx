import * as motion from "motion/react-client";
import { useTheme } from "../stores/useTheme";

export const ThemeToggler = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      className="toggle-container"
      style={{
        ...container,
        justifyContent: "flex-" + (!isDark ? "start" : "end"),
        borderColor: isDark ? "white" : "black",
      }}
      onClick={toggleTheme}
    >
      <motion.div
        className="toggle-handle"
        style={{
          ...handle,
          backgroundColor: isDark ? "white" : "black",
        }}
        layout
        transition={{
          type: "spring",
          visualDuration: 0.2,
          bounce: 0.2,
        }}
      />
    </button>
  );
};

const container = {
  width: 70,
  height: 30,
  backgroundColor: "var(--hue-3-transparent)",
  borderRadius: 50,
  cursor: "pointer",
  display: "flex",
  padding: 10,
  justifyContent: "center",
  alignItems: "center",
};

const handle = {
  width: 20,
  height: 20,
  backgroundColor: "#9911ff",
  borderRadius: "50%",
};
