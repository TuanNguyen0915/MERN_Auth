import { navLinks } from "../../data/data";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="container flex items-center justify-between bg-slate-400/50">
      <h1 className="text-[24px] font-bold text-textLink hover:text-black md:text-[28px]">
        <NavLink to="/">MERN Auth</NavLink>
      </h1>
      <ul className="flex items-center justify-between gap-4 md:gap-8 ">
        {navLinks.map((link, idx) => (
          <li
            key={idx}
            className="font-semibold transition-color hover:text-textLink md:text-[20px]"
          >
            <NavLink
              to={link.path}
              className={(navClass) =>
                navClass.isActive ? "text-textLink" : ""
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default NavBar;
