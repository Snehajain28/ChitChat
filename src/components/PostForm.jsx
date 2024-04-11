import { useNavigate } from "react-router-dom";
import { useStateValues } from "../Utils/Provider";
import { createPost, updatePost } from "../backend/auth/api";
import { toast } from "react-toast";
import FileUploader from "./FileUploader";
import { useState } from "react";
import Loader from "./Loader";


const PostForm = ({ post, action }) => {
    const navigate = useNavigate();
    const [{ user, abc }, dispatch] = useStateValues();
    const [Loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        file: [],
        location: post ? post.location : "",
        tags: post ? post.tags.join(",") : "",
        caption: post ? post?.caption : "",
    })
    if (abc) { console.log(dispatch) }


    const changeHandler = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }
    const fieldChange = (f) => {
        setFormData({
            file: f
        })
    }
   
    const handleSubmit = async (e, value) => {
        e.preventDefault();
        setLoading(true);
        if (post && action === "Update") {
            const updatedPost = await updatePost({
                ...value,
                postId: post.$id,
                imageId: post.imageId,
                imageUrl: post.imageUrl,
            });

            if (!updatedPost) {
                toast("post failed. Please try again.");
            }
            return navigate(`/posts/${post.$id}`);
        }

        const newPost = await createPost({
            formData,
            userId: user.$id,
        });

        if (!newPost) {
            toast("post failed. Please try again.");
        }
        if (newPost) {
            toast("post Created");
        }
      
        setLoading(false);
        navigate("/");
    };

    return (
        <div >
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8 w-full  max-w-5xl">

                <div className="flex flex-col gap-3 ">
                    <label className="text-white ">Caption :</label>
                    <textarea
                        name="caption"
                        cols="30"
                        rows="10"
                        onChange={changeHandler}
                        value={formData.caption}
                        className="h-36 bg-[#101012] px-3 py-2 rounded-xl border-none  custom-scrollbar focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-[#7878a3]"
                    ></textarea>
                </div>
                <div className="flex flex-col gap-3 ">
                    <label className="text-white">Add Photos :</label>
                    {<FileUploader fieldChange={fieldChange}
                        mediaUrl={post?.imageUrl}
                    />}
                </div>

                <div className="flex flex-col gap-3 ">
                    <label className="text-white">Add Location :</label>
                    <input
                        type="text"
                        className="h-[2.4rem] w-[15rem] px-3 rounded-lg bg-[#1F1F22] border-none  focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-[#5C5C7B] "
                        name="location"
                        onChange={changeHandler}
                        value={formData.location}
                    />
                </div>

                <div className="flex flex-col gap-3 ">
                    <label className="text-white">  Add Tags (separated by comma " , ":</label>
                    <input
                        type="text"
                        className="h-[2.4rem] w-[15rem] px-3 rounded-lg bg-[#1F1F22] border-none  focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-[#5C5C7B] "
                        name="tags"
                        placeholder="Art, Expression, Learn"
                        onChange={changeHandler}
                        value={formData.tags}
                    />
                </div>

                <div className="flex gap-4 items-center justify-end">
                    <button
                        className="h-10 rounded-md pointer-cursor bg-[#1f1f22] py-2 px-5 text-[#ffffff] flex gap-2"
                        onClick={() => navigate(-1)}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="h-10 px-4 py-2 pointer-cursor rounded-sm  sm:h-9 sm:rounded-md sm:px-3 lg:h-11 lg:rounded-md lg:px-8 hover:bg-[#877eff] bg-[#5d5fef] text-[#ffffff] flex gap-2 whitespace-nowrap">
                        {Loading ? (<Loader />)
                            : (`${action} Post`)
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;