import { useState } from "react";
import { Outlet } from "react-router-dom";
import logo from "./assets/img/logo.svg";

function App() {
  const [show, setShow] = useState(false);
  setTimeout(() => setShow(true), 2000);

  return (
    <div className="App">
      {!show && (
        <div className="app-cover">
          <img src={logo} alt="logo" />
        </div>
      )}
      {show && (
        <div>
          <div className="app-body">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
