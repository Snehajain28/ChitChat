import { Link,useNavigate } from "react-router-dom";
import { useStateValues } from "../Utils/Provider";
import { IoIosLogOut } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";

const Topbar = () => {
  const [{ user }, dispatch] = useStateValues();
const navigate = useNavigate();

const signOutAccount = () => {
dispatch ({
type:"SET_USER",
user:null
})
localStorage.removeItem("user");
navigate('/');
}

  return (
    <section className="sticky top-0 z-50 md:hidden bg-[#09090a] w-full">
      <div className="flex justify-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="https://ideogram.ai/api/images/direct/xNvemxYrRMeNtIv-_V4MsQ.png"
            alt="logo"
            width={40}
            className="rounded-lg"
            height={40}
          />
        </Link>

        <div className="flex gap-4">
          <button
            className="flex gap-4 items-center justify-start hover:bg-transparent hover:text-white"
            onClick={signOutAccount}>
            <IoIosLogOut className="text-white text-[1.5rem]" />
          </button>
          <Link to={`/profile/${user.$id}`} className="flex items-center gap-3">
            {
              user.imageUrl ?
                (<img
                  src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                  alt="profile"
                  className="h-8 w-8 rounded-full"
                />)
                : (<FaRegUser className="h-7 w-7 rounded-full text-white" />)
            }

          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;