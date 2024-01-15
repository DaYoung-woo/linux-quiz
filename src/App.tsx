import { useState } from "react";
import { Outlet } from "react-router-dom";
import logo from "./assets/img/logo.svg";
import logoDark from "./assets/img/logo_dark.svg";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const [show, setShow] = useState(false);
  const [theme, setTheme] = useState("light");

  setTimeout(() => setShow(true), 2000);
  return (
    <div className="App">
      <ThemeContext.Provider value={theme}>
        {!show && theme && <img src={logo} alt="logo" />}
        {!show && !theme && <img src={logoDark} alt="logo" />}
        {show && <Outlet />}
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
