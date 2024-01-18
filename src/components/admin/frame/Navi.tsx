import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/img/logo.svg";

function Navi() {
  const location = useLocation();
  const [active, setActive] = useState("/dashboard");

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  const menuList = [
    {
      to: "/admin/dashboard",
      title: "대시보드",
    },
    {
      to: "/admin/quiz",
      title: "문제 관리",
    },
  ];
  return (
    <nav>
      <ul>
        <li className="flex justify-center mb-4">
          <img src={logo} alt="logo" className="w-20 basic-button" />
        </li>
        {menuList.map(({ to, title }) => (
          <Link to={to} key={title}>
            <li
              className={
                (active.includes(to) && "text-indigo-500 bg-slate-100") ||
                "hover:bg-slate-50"
              }
            >
              {title}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export default Navi;
