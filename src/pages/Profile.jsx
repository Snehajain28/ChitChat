import { Route, Routes, Link, Outlet, useParams, useLocation, } from "react-router-dom";
import { useStateValues } from "../Utils/Provider";
import { getUserById } from "../backend/api";
import Loader from "../components/Loader";
import GridPostList from "../components/GridPostList";
import LikedPosts from "./LikedPost";
import { useCallback, useEffect, useState } from "react";
import { LuPenLine } from "react-icons/lu";
import { SlPicture } from "react-icons/sl";
import { BiHeart } from "react-icons/bi";
import PostCard from "../components/PostCard";



const Profile = () => {
  const { id } = useParams();
  const [{ user, abc }, dispatch] = useStateValues();
  const { pathname } = useLocation();
  const [currentUser, setCurrentUser] = useState();

  if (abc) { console.log(dispatch) }

  const getData = useCallback((async () => {
    const data = await getUserById(id)
    setCurrentUser(data);
  }), [id])

  useEffect((() => {
    getData();
  }), [getData])


  if (!currentUser)
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className=" flex flex-col items-center flex-1 gap-10 overflow-scroll py-10 px-5 md:p-14 custom-scrollbar">
      <div className="flex items-center md:mb-8 xl:items-start gap-8 flex-col xl:flex-row relative max-w-5xl w-full">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
              currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left text-[24px] font-bold leading-[140%] tracking-tighter md:text-[36px] md:font-semibold w-full">
                {currentUser.name}
              </h1>
              <p className="text-[14px] font-normal leading-[140%] md:text-[18px] md:font-medium text-[#7878A3] text-center xl:text-left">
                @{currentUser.username}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">

              <div className="flex flex-col justify-center items-center gap-2">
                <p className="text-[14px] font-semibold leading-[140%] tracking-tighter lg:text-[18px] lg:font-bold text-[#877EFF] ">{currentUser?.posts?.length}</p>
                <p className="text-[14px] font-medium leading-[140%] lg:text-[16px] text-[#EFEFEF] ">{"Posts"}</p>
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <p className="text-[14px] font-semibold leading-[140%] tracking-tighter lg:text-[18px] lg:font-bold text-[#877EFF] ">{20} </p>
                <p className="text-[14px] font-medium leading-[140%] lg:text-[16px] text-[#EFEFEF] ">{"Followers"}</p>
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <p className="text-[14px] font-semibold leading-[140%] tracking-tighter lg:text-[18px] lg:font-bold text-[#877EFF] ">{20}</p>
                <p className="text-[14px] font-medium leading-[140%] lg:text-[16px] text-[#EFEFEF] ">{"Following"}</p>
              </div>
            </div>

            <p className="text-[14px] font-medium leading-[140%] md:text-[16px] text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser.bio}
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <div>
              <Link
                to={`/update-profile/${currentUser.$id}`}
                className={`h-12 bg-[#1F1F22] px-5 text-[#FFFFFF] flex justify-center items-center gap-2 rounded-lg ${user.$id !== currentUser.$id && "hidden"
                  }`}>
                <LuPenLine />
                <p className="flex whitespace-nowrap text-[14px] font-medium leading-[140%]">
                  Edit Profile
                </p>
              </Link>
            </div>
            <div className={`${user.$id === id && "hidden"}`}>
              <button className="bg-[#877EFF] hover:bg-[#5D5FEF] text-[#FFFFFF] flex gap-2 py-2 px-8">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>

      {currentUser.$id === user.$id && (
        <div className="flex max-w-5xl w-full">
          <Link
            to={`/profile/${id}`}
            className={`flex justify-center items-center gap-3 py-4 w-48 bg-[#09090A]  transition flex-1 xl:flex-initial rounded-l-lg ${pathname === `/profile/${id}` && "!bg-dark-3"
              }`}>
            <SlPicture />
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={` flex justify-center items-center gap-3 py-4 w-48 bg-[#09090A]  transition flex-1 xl:flex-initial rounded-r-lg ${pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
              }`}>
            <BiHeart />
            Liked Posts
          </Link>
        </div>
      )}

      {currentUser.$id === user.$id ? (<>
        {
          currentUser?.posts.length === 0 ?
            (<Link to={'/create-post'}>
              + Create Posts
            </Link>) : (
              <div>
                {currentUser?.posts.map((post) => {
                  return <PostCard post={post} />
                })

                }
              </div>
            )
        }
      </>
      ) :
        (
          <>
        {
          currentUser?.posts.length === 0 ?
            (<div>
            No Posts
            </div>) : (
              <div>
              <GridPostList posts={currentUser.posts} />
  
              </div>
            )
        }
      </>
        )
      }
   
      <Routes>
        <Route
          index
          element={<GridPostList posts={currentUser.posts} showUser={false} />}
        />
        {currentUser.$id === user.$id && (
          <Route path="/liked-posts" element={<LikedPosts />} />
        )}
      </Routes>
      <Outlet />
    </div >
  );
};

export default Profile;