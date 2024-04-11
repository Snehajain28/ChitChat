import { useCallback, useEffect, useState } from "react";
import { getCurrentUser } from "../backend/auth/api";
import GridPostList from "../components/GridPostList";
import Loader from "../components/Loader";
import { CiSaveDown2 } from "react-icons/ci";
import { Link } from "react-router-dom";

const Saved = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const getData = useCallback((async () => {
    const data = await getCurrentUser();
    setCurrentUser(data);
  }), [])

  useEffect((() => {
    getData();
  }), [getData])

  const savePosts = currentUser?.saves?.map((savePost) => ({
    ...savePost.post,
    creator: {
      imageUrl: currentUser.imageUrl,
    },
  }))

  return (
    <div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-3 px-5 md:p-14 custom-scrollbar">
      <div className="flex items-center gap-2 w-full max-w-5xl">
        <CiSaveDown2 size={30}/>
        <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px] text-left w-full">Saved Posts</h2>
      </div>

      {!currentUser ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {savePosts?.length === 0 ? (
          <div className="flex h-full justify-center flex-col text-center">
            <p className="text-[#5C5C7B] text-[1rem] ">No available posts</p>
         <Link to={'/'} className="text-blue-700 text-[0.8rem]">{"Save Now "}</Link>
         </div> ) : (
            <GridPostList posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default Saved;