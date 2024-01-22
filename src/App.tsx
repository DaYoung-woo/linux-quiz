import { useState } from "react";
import { Outlet } from "react-router-dom";
import logo from "./assets/img/logo.svg";
import Header from "./components/frame/Header";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const [show, setShow] = useState(false);
  setTimeout(() => setShow(true), 2000);

  const darkMode = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(darkMode);

  const clickIcon = () => {
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`App ${theme}`}>
      <ThemeContext.Provider value={theme}>
        {!show && (
          <div className="app-cover">
            <img src={logo} alt="logo" />
          </div>
        )}
        {show && (
          <>
            <Header clickIcon={clickIcon} />
            <Outlet />
          </>
        )}
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
