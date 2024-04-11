import { FaPlus } from "react-icons/fa";
import PostForm from "../components/PostForm";

const CreatePost = () => {
  return (
    <div className="flex flex-1 bg-[#000000] text-white ">
      <div className="flex flex-col flex-1 items-center gap-7 overflow-scroll py-3 px-5 md:px-8 lg:p-14 custom-scrollbar">
        <div className="max-w-5xl flex items-center justify-start gap-3 justify-start w-full">
          <FaPlus />
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
        </div>

        <PostForm action="Create" />
      </div>
    </div>
  );
};

export default CreatePost;