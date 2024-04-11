import { Link } from "react-router-dom";
import { useStateValues } from "../Utils/Provider";
import PostStats from "./PostStats";

const GridPostList = ({posts,showUser = true,showStats = true,}) => {
  const [{ user,abc }, dispatch] = useStateValues();

  if(abc){console.log(dispatch)}


  return (
    <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-5xl">
      {posts?.map((post) => (
        <li key={post.$id} className="relative w-11/12 mx-auto h-50">
          <Link to={`/posts/${post.$id}`} className="flex rounded-[24px] border border-[#1F1F22] overflow-hidden cursor-pointer w-full h-full">
            <img
              src={post.imageUrl}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>

          <div className="absolute bottom-0 p-5 flex-between w-full bg-gradient-to-t from-[#101012] to-transparent rounded-b-[24px] gap-2">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={
                    post?.creator?.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1">{post?.creator?.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;