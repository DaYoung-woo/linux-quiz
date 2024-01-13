import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import logo from "./assets/img/logo.svg";
function App() {
  const [show, setShow] = useState(false);

  setTimeout(() => setShow(true), 2000);
  return (
    <div className="App">
      {!show && <img src={logo} />}
      {show && <Outlet />}
    </div>
  );
}

export default App;
