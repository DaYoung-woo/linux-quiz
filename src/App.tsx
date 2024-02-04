import { useState } from "react";
import { Outlet } from "react-router-dom";
import logo from "./assets/img/logo.svg";
import Header from "./components/frame/Header";
import { ThemeContext } from "./context/ThemeContext";

function App() {

  const darkMode = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(darkMode);

  const clickIcon = () => {
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`App ${theme}`}>
      <ThemeContext.Provider value={theme}>
        <div>
          <Header clickIcon={clickIcon} />
          <div className="app-body">
            <Outlet />
          </div>
        </div>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
