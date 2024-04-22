import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useStateValues } from "../Utils/Provider";
import Loader from "./Loader";
import { FaHome, FaInternetExplorer, FaPlus, FaRegSave, FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";


const sidebarLinks = [
  {
    icon: <FaHome />,
    route: "/",
    label: "Home",
  },
  {
    icon: <FaInternetExplorer />,
    route: "/explore",
    label: "Explore",
  },
  {
    icon: <FaUser />,
    route: "/all-users",
    label: "People",
  },
  {
    icon: <FaRegSave />,
    route: "/saved",
    label: "Saved",
  },
  {
    icon: <FaPlus />,
    route: "/create-post",
    label: "Create Post",
  },
];

const LeftSideBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [{ user, abc }, dispatch] = useStateValues();

  if (abc) { console.log(dispatch) }


  const signOutAccount = () => {
    dispatch({
      type: "SET_USER",
      user: null
    })
    localStorage.removeItem("user");
  }


  const handleSignOut = async (e) => {
    e.preventDefault();
    signOutAccount();
    navigate("/login");
  };

  return (
    <nav className="hidden md:flex px-6 py-10 flex-col justify-between min-w-[270px] text-white  bg-[#09090a]">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="https://ideogram.ai/api/images/direct/xNvemxYrRMeNtIv-_V4MsQ.png"
            alt="logo"
            className="rounded-lg h-[3rem] w-[3rem]"
           
          />
          <p className="text-[1.5rem] font-bold">Chit Chat</p>
        </Link>

        {!user?.email ? (
          <div className="h-14">
            <Loader />
          </div>
        ) : (
          <Link to={`/profile/${user.$id}`} className="flex gap-3 items-center">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
          </Link>
        )}

        <ul className="flex flex-col gap-4">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`rounded-lg base-medium hover:bg-[#877eff] transition group ${isActive && "bg-primary-500"
                  }`}>
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4">
                  <div className={` text-white group-hover:invert-white ${isActive && "invert-white"}`}> {link.icon}</div>
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <button
        className="flex gap-4 items-center justify-start hover:bg-transparent hover:text-white"
        onClick={(e) => handleSignOut(e)}>
        <IoIosLogOut className="text-white" />
        <p className="text-[14px] text-white font-medium leading-[140%] lg:text-[16px]">Logout</p>
      </button>
    </nav>
  );
};

export default LeftSideBar;