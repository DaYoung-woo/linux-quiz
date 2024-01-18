import { ReactComponent as LogoutImg } from "../../../assets/img/logout.svg";
import { logOut } from "../../../utils/firebase";
import { useNavigate } from "react-router-dom";
function Header() {
  const photoURL = localStorage.getItem("photoURL");
  const naviagte = useNavigate();
  const signout = () => {
    logOut().then(() => {
      naviagte("/admin");
    });
  };
  return (
    <header className="h-16">
      <LogoutImg onClick={signout} fill="#4b5563" className="mr-2" />
      <img src={photoURL} alt="logo" className="w-10 rounded-full mr-4" />
    </header>
  );
}

export default Header;
