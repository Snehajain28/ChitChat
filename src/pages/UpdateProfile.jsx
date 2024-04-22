import { useNavigate, useParams } from "react-router-dom";
import { useStateValues } from "../Utils/Provider";
import { getUserById, updateUser } from "../backend/api";
import { useCallback, useEffect, useState } from "react";
import Loader from "../components/Loader";
import { toast } from "react-toast";
import ProfileUploader from "../components/ProfileUploader";
import { BsPenFill } from "react-icons/bs";

const UpdateProfile = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [Loading, setLoading] = useState(false)
  const [{ user }, dispatch] = useStateValues();
  const [currentUser, setCurrentUser] = useState();

  const [formData, setFormData] = useState({
    file: [],
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio || "",
  })

  const getData = useCallback((async () => {
    const data = await getUserById(id)
    setCurrentUser(data);
  }), [id])

  useEffect((() => {
    getData();
  }), [getData])


  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  // Handler
  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const fieldChangehandler = () => {

  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedUser = await updateUser({
      userId: currentUser.$id,
      name: formData.name,
      bio: formData.bio,
      file: formData.file,
      imageUrl: currentUser.imageUrl,
      imageId: currentUser.imageId,
    });

    if (!updatedUser) {
      toast(`Update user failed. Please try again.`);
    }

    dispatch({
      type: "SET_USER",
      user: {
        name: updatedUser?.name,
        bio: updatedUser?.bio,
        imageUrl: updatedUser?.imageUrl,
      }
    });
    setLoading(false);
    return navigate(`/profile/${id}`);
  };

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-6 overflow-scroll py-2 px-5 md:px-8 lg:p-14 custom-scrollbar">
        <div className="flex justify-start items-center gap-3  w-full max-w-5xl">
          <BsPenFill />
          <h2 className=" text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px] text-left w-full">Edit Profile</h2>
        </div>

        <div >
          <form onSubmit={handleUpdate}
            className="flex flex-col gap-6 w-full  max-w-5xl">

            <div className="flex justify-center items-center flex-col gap-5 ">
              <ProfileUploader
                fieldChange={fieldChangehandler}
                mediaUrl={currentUser.imageUrl}
              />
            </div>

            <div className="flex flex-col gap-3 ">
              <label className="text-white">Name :</label>
              <input
                type="text"
                className="h-[2.4rem] w-[15rem] px-3 rounded-lg bg-[#1F1F22] border-none  focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-[#5C5C7B] "
                name="name"
                onChange={changeHandler}
                value={formData.name}
              />
            </div>

            <div className="flex flex-col gap-3 ">
              <label className="text-white">Username :</label>
              <input
                type="text"
                className="h-[2.4rem] w-[15rem] px-3 rounded-lg bg-[#1F1F22] border-none  focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-[#5C5C7B] "
                name="username"
                onChange={changeHandler}
                value={formData.username}
              />
            </div>

            <div className="flex flex-col gap-3 ">
              <label className="text-white">Bio :</label>
              <input
                type="text"
                placeholder="bio"
                className="h-[2.4rem] w-[15rem] px-3 rounded-lg bg-[#1F1F22] border-none  focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-[#5C5C7B] "
                name="bio"
                onChange={changeHandler}
                value={formData.bio}
              />
            </div>

            <div className="flex flex-col gap-3 ">
              <label className="text-white">Email :</label>
              <input
                type="text"
                className="h-[2.4rem] w-[15rem] px-3 rounded-lg bg-[#1F1F22] border-none  focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-[#5C5C7B] "
                name="email"
                onChange={changeHandler}
                value={formData.email}
              />
            </div>



            <div className="flex gap-4 items-center justify-end">
              <button
                type="button"
                className="shad-button_dark_4"
                onClick={() => navigate(-1)}>
                Cancel
              </button>
              <button
                type="submit"
                className="h-10 px-4 py-2 pointer-cursor rounded-sm  sm:h-9 sm:rounded-md sm:px-3 lg:h-11 lg:rounded-md lg:px-8 hover:bg-[#877eff] bg-[#5d5fef] text-[#ffffff] flex gap-2 whitespace-nowrap">
                {Loading ? (<Loader />)
                  : (`Update`)
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;