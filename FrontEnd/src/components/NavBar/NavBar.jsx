import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="container flex items-center justify-between bg-slate-800">
      <h1 className="text-[24px] font-bold text-textLink hover:text-white md:text-[28px]">
        <NavLink to="/">MERN Auth</NavLink>
      </h1>
      <ul className="flex items-center justify-between gap-4 font-semibold text-white md:gap-8">
        <li>
          <NavLink
            to="/"
            className={(navClass) => (navClass.isActive ? "text-textLink" : "")}
          >
            Home
          </NavLink>
        </li>
        {currentUser ? (
          <>
            <li>
              <NavLink
                to="/profile"
                className="item-center flex h-full justify-center"
              >
                <img
                  src={currentUser.user.photo}
                  alt=""
                  className="h-10 w-10 rounded-full"
                />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/logout"
                className={(navClass) =>
                  navClass.isActive ? "text-textLink" : ""
                }
              >
                LogOut
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/login"
                className={(navClass) =>
                  navClass.isActive ? "text-textLink" : ""
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={(navClass) =>
                  navClass.isActive ? "text-textLink" : ""
                }
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
export default NavBar;
