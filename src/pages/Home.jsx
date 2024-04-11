import { getRecentPosts, getUsers } from "../backend/auth/api";
import { useCallback, useEffect, useState } from "react";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";
import UserCard from "../components/UserCard";


const Home = () => {

  const [posts, setPosts] = useState([]);
  const [creators, setCreator] = useState([]);

  const getData = useCallback((async () => {
    const postdata = await getRecentPosts();
    const creatordata = await getUsers(10);
    setPosts(postdata);
    setCreator(creatordata);
  }), [])

  useEffect((() => {
    getData();

  }), [getData])

  

  if (posts?.length === 0 || creators?.length === 0) {
    return (
      <div className="bg-[#0f0f0f]  animate-pulse  flex flex-1">
        <div className="flex flex-col items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
          <p className="text-[18px] font-md leading-[140%] text-[#FFFFFF]">Something bad happened</p>
        </div>
        <div className="hidden xl:flex flex-col  w-72 2xl:w-465 px-6 py-10 gap-10  overflow-scroll custom-scrollbar">
          <p className="text-[18px] font-md leading-[140%] text-[#ffffff]">Something bad happened</p>
        </div>
      </div>
    );
  }


  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-5 px-5 md:px-8 lg:p-14 custom-scrollbar">
        <div className="max-w-screen-sm flex flex-col items-center w-full gap-6 md:gap-9">
          <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px] text-left w-full">Home Feed</h2>
          {!posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {posts?.documents?.map((post) => (
                <li key={post.$id} className="flex justify-center w-full">
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="hidden xl:flex flex-col w-72 2xl:w-465 px-6 py-10 gap-10  overflow-scroll custom-scrollbar">
        <h3 className="text-[24px] font-bold leading-[140%] tracking-tighter text-[#ffffff]">Top Creators</h3>
        {!creators ? (
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {creators?.documents?.map((creator) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;