import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

function App() {
  const darkMode = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(darkMode);

  return (
    <div className={`App ${theme}`}>
      <ThemeContext.Provider value={theme}>
        <Outlet />
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
