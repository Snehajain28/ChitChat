import { getCurrentUser } from "../backend/auth/api";
import GridPostList from "../components/GridPostList";
import Loader from "../components/Loader";


const LikedPosts = () => {
  const {  currentUser } = getCurrentUser();

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader/>
      </div>
    );

  return (
    <>
      {currentUser.liked.length === 0 && (
        <p className="text-[#5C5C7B] ">No liked posts</p>
      )}

      <GridPostList posts={currentUser.liked} showStats={false} />
    </>
  );
};

export default LikedPosts;