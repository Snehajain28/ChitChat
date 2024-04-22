import { Link } from "react-router-dom";
import { useStateValues } from "../Utils/Provider";
import PostStats from "./PostStats";

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
  const now= new Date();
  const diff = now.getTime() - date.getTime();
  const diffInSeconds = diff / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays= diffInHours / 24;

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

const PostCard = ({ post }) => {
 
  const [{ user, abc }, dispatch] = useStateValues();

  if (abc) { console.log(dispatch) }
 
  if (!post.creator) return;

  return (
    <div className="bg-[#09090A] rounded-3xl border border-[#1F1F22] p-5 lg:p-7 lg:w-[400px] w-full  max-w-screen-sm">
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post.creator?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="w-12 lg:h-12 rounded-full"
            />
          </Link>

          <div className="flex flex-col">
            <p className="text-[16px] font-medium leading-[140%] lg:text-[18px] lg:font-bold text-[#FFFFFF]">
              {post.creator.name}
            </p>
            <div className="flex justify-center items-center gap-2 text-[#7878A3] ">
              <p className=" text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-normal lg:leading-[140%] ">
                {multiFormatDateString(post.$createdAt)}
              </p>
              •
              <p className=" text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-normal ">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}>
          <img
            src={"/assets/icons/edit.svg"}
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className="text-[14px] font-medium leading-[140%] lg:text-[16px] lg:font-normal py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag, index) => (
              <li key={`${tag}${index}`} className="text-[#7878A3] text-[14px] font-normal leading-[140%]">
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <img
          src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="post"
          className="mx-auto w-full h-64 xs:h-[400px] lg:h-[250px] lg:w-[250px] w-full rounded-[24px] object-cover mb-5"
        />
      </Link>

      <PostStats post={post} userId={user.$id} />
    </div>
  );
};

export default PostCard;