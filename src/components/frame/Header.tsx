import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
function Header({ clickIcon }) {
  const theme = useContext(ThemeContext);
  return (
    <header className="flex items-center px-2 py-4">
      <ThemeContext.Provider value={theme}>
        <Logo width="30px" height="30px" className="mr-2" />
        리눅스 마스터 기출 문제 풀이
      </ThemeContext.Provider>
    </header>
  );
}

export default Header;
