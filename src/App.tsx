import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import logo from "./assets/img/logo.svg";
import logoDark from "./assets/img/logo_dark.svg";
function App() {
  const [show, setShow] = useState(false);

  setTimeout(() => setShow(true), 2000);
  return (
    <div className="App">
      {!show && <img src={logo} alt="logo" />}
      {!show && <img src={logoDark} alt="logo" />}
      {show && <Outlet />}
    </div>
  );
}

export default App;
