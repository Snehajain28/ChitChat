import { useParams } from "react-router-dom";
import { getPostById } from "../backend/api";
import PostForm from "../components/PostForm";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const EditPost = () => {

  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect((() => {
    async function getData() {
      setLoading(true)
      const data = await getPostById(id);
      setPost(data);
      setLoading(false)
    }
    getData();
  }), [id])

  if (isLoading)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 justify-start w-full max-w-5xl">
          <img
            src="/assets/icons/edit.svg"
            width={36}
            height={36}
            alt="edit"
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>

        {isLoading ? <Loader /> : <PostForm action="Update" post={post} />}
      </div>
    </div>
  );
};

export default EditPost;