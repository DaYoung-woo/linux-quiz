import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/img/logo.svg";

function Navi() {
  const location = useLocation();
  const [active, setActive] = useState("/");

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  const menuList = [
    {
      to: "/admin/quiz_list",
      title: "문제 관리",
      keyword: "quiz",
    },
    {
      to: "/admin/category_list",
      title: "카테고리 관리",
      keyword: "category",
    },
  ];
  return (
    <nav>
      <ul>
        <li className="flex justify-center mb-4">
          <img src={logo} alt="logo" className="w-20 basic-button" />
        </li>
        {menuList.map(({ to, title, keyword }) => (
          <Link to={to} key={title}>
            <li
              className={
                (active.includes(keyword) && "text-indigo-500 bg-slate-200") ||
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
