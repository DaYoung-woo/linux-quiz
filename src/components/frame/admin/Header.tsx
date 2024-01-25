import { useRecoilValue, useSetRecoilState } from "recoil";
import { userEmailAtom, userPhotoAtom } from "../../../api/recoil";
import { ReactComponent as LogoutImg } from "../../../assets/img/logout.svg";
import { logOut } from "../../../utils/firebase";
import { useNavigate } from "react-router-dom";
function Header() {
  const naviagte = useNavigate();
  const setUserEmail = useSetRecoilState(userEmailAtom);
  const userPhoto = useRecoilValue(userPhotoAtom)
  const signout = () => {
    logOut().then(() => {
      setUserEmail(null)
      naviagte("/admin");
    });
  };
  return (
    <header className="h-16">
      <LogoutImg onClick={signout} fill="#4b5563" className="mr-2" />
      {/* <img src={userPhoto} alt="logo" className="w-8 rounded-full mr-4" /> */}
    </header>
  );
}

export default Header;
