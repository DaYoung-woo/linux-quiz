import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
function Header({ clickIcon }) {
  const theme = useContext(ThemeContext);
  return (
    <header className="flex items-center px-2">
      <ThemeContext.Provider value={theme}>
        <Logo width="30px" height="30px"></Logo>
      </ThemeContext.Provider>
    </header>
  );
}

export default Header;
