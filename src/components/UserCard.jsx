import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <Link to={`/profile/${user.$id}`} className="flex justify-center flex-col gap-4 border border-[#1f1f22] rounded-[20px] px-5 py-8">
      <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full w-14 h-14"
      />

      <div className="flex justify-center items-center flex-col gap-1">
        <p className="text-[16px] font-medium leading-[140%] text-[#ffffff] text-center line-clamp-1">
          {user.name}
        </p>
        <p className=" text-[14px] font-normal leading-[140%] text-[#7878A3] text-center line-clamp-1">
          @{user.username}
        </p>
      </div>

      <button type="button" size="sm" className="bg-primary-500 hover:bg-primary-500 text-light-1 flex gap-2 px-5">
        Follow
      </button>
    </Link>
  );
};

export default UserCard;
