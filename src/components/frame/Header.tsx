import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import logo from "../../assets/img/logo.svg";

function Header({ clickIcon }) {
  const theme = useContext(ThemeContext);
  return (
    <header className="flex align-center">
      <ThemeContext.Provider value={theme}>
        <img src={logo} alt="logo" width="30px" />
        <div onClick={clickIcon}>icon</div>
      </ThemeContext.Provider>
    </header>
  );
}

export default Header;
