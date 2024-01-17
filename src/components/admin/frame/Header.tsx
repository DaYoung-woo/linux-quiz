import logoutImg from "../../../assets/img/logout.svg";
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
    <header className="h-16 ">
      <img
        src={logoutImg}
        alt="logout"
        className="w-6 mr-2"
        onClick={signout}
      />
      <img src={photoURL} alt="logo" className="w-8 rounded-full mr-4" />
    </header>
  );
}

export default Header;
