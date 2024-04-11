import { useParams, Link, useNavigate } from "react-router-dom";
import { getPostById, getUserById, deletePost } from "../backend/auth/api";
import { useStateValues } from "../Utils/Provider";
import Loader from "../components/Loader";
import PostStats from "../components/PostStats";
import GridPostList from "../components/GridPostList";
import { FaBackward } from 'react-icons/fa'
import { useCallback, useEffect, useState } from "react";

function formatDateString(dateString) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${formattedDate} at ${time}`;
}

const multiFormatDateString = (timestamp) => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date = new Date(timestampNum * 1000);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffInSeconds = diff / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;

  switch (true) {
    case Math.floor(diffInDays) >= 30:
      return formatDateString(timestamp);
    case Math.floor(diffInDays) === 1:
      return `${Math.floor(diffInDays)} day ago`;
    case Math.floor(diffInDays) > 1 && diffInDays < 30:
      return `${Math.floor(diffInDays)} days ago`;
    case Math.floor(diffInHours) >= 1:
      return `${Math.floor(diffInHours)} hours ago`;
    case Math.floor(diffInMinutes) >= 1:
      return `${Math.floor(diffInMinutes)} minutes ago`;
    default:
      return "Just now";
  }
};

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [{ user, abc }, dispatch] = useStateValues();
  if (abc) { console.log(dispatch) }

  
  const [post, setPost] = useState(null);
  const [userPosts, setuserPosts] = useState([]);

  // const deletePost = deletePost();

  const getData = useCallback((async () => {
    const postdata = await getPostById(id);
    const data = await getUserById(post?.creator.$id);
    setPost(postdata);
    setuserPosts(data);
  }), [id,post?.creator?.$id])

  useEffect((() => {
    getData();
  }), [getData])


  const relatedPosts = userPosts?.documents?.filter(
    (userPost) => userPost.$id !== id
  );

  const handleDeletePost = () => {
    deletePost({ postId: id, imageId: post?.imageId });
    navigate(-1);
  };

  return (
    <div className=" flex flex-col flex-1 gap-10 overflow-scroll py-10 px-5 md:p-14 custom-scrollbar items-center">
      <div className="hidden md:flex max-w-5xl w-full">
        <button
          onClick={() => navigate(-1)}
          className=" flex gap-4 items-center justify-start hover:bg-transparent hover:text-white">
          <FaBackward />
          <p className="text-[14px] font-medium leading-[140%] lg:text-[16px]">Back</p>
        </button>
      </div>

      {!post ? (
        <Loader />
      ) : (
        <div className="bg-[#09090A] w-full max-w-5xl rounded-[30px] flex-col flex xl:flex-row border border-[#1F1F22] xl:rounded-l-[24px]">
          <img
            src={post?.imageUrl}
            alt="creator"
            className="h-80 lg:h-[480px] xl:w-[48%] rounded-t-[30px] xl:rounded-l-[24px] xl:rounded-tr-none object-cover p-5 bg-[#000000]"
          />

          <div className=" bg-[#09090A] flex flex-col gap-5 lg:gap-7 flex-1 items-start p-8 rounded-[30px]">
            <div className="flex justify-between items-center w-full">
              <Link
                to={`/profile/${post?.creator?.$id}`}
                className="flex items-center gap-3">
                <img
                  src={
                    post?.creator?.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                />
                <div className="flex gap-1 flex-col">
                  <p className="text-[16px] font-medium leading-[140%] lg:text-[18px] lg:font-bold text-[#FFFFFF]">
                    {post?.creator.name}
                  </p>
                  <div className="flex justify-center items-center gap-2 text-[#7878A3] ">
                    <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-normal ">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    •
                    <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-normal">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex justify-center items-center gap-4">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}>
                  <img
                    src={"/assets/icons/edit.svg"}
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>

                <button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ost_details-delete_btn ${user.id !== post?.creator.$id && "hidden"
                    }`}>
                  <img
                    src={"/assets/icons/delete.svg"}
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag, index) => (
                  <li
                    key={`${tag}${index}`}
                    className="text-light-3 small-regular">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl">
        <hr className="border w-full border-dark-4/80" />

        <h3 className="body-bold md:h3-bold w-full my-10">
          More Related Posts
        </h3>
        {!relatedPosts ? (
          <Loader />
        ) : (
          <GridPostList posts={relatedPosts} />
        )}
      </div>
    </div>
  );
};

export default PostDetails;