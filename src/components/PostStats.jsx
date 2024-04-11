import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { deleteSavedPost, getCurrentUser, likePost, savePost } from "../backend/api";
import { FaHeart } from 'react-icons/fa'
import {  BsSave, BsSaveFill } from 'react-icons/bs'



const checkIsLiked = (likeList, userId) => {
  return likeList.includes(userId);
};

const PostStats = ({ post, userId }) => {

  const location = useLocation();
  const likesList = post.likes.map((user) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false)
  const { currentUser } = getCurrentUser();

  const savedPostRecord = currentUser?.save.find((record) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser, savedPostRecord]);

  const handleLikePost = (e) => {

    let likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId);
    }

    setLikes(likesArray);
    likePost({ postId: post.$id, likesArray });
  };

  const handleSavePost = (e) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavedPost(savedPostRecord.$id);
    }

    savePost({ userId: userId, postId: post.$id });
    setIsSaved(true);
  };

  const containerStyles = location.pathname.startsWith("/profile")
    ? "w-full"
    : "";

  return (
    <div
      className={`flex justify-between items-center z-20 ${containerStyles}`}>
      <div className="flex items-center gap-2 mr-5">
        {
          checkIsLiked(likes, userId) ?
            (<FaHeart className="cursor-pointer text-red-600" onClick={(e) => handleLikePost(e)} />) :
            (<FaHeart className="cursor-pointer" onClick={(e) => handleLikePost(e)} />)
        }
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex  gap-2">
        {
          isSaved ?
           (<BsSaveFill  onClick={handleSavePost}/>) :
            (<BsSave  onClick={handleSavePost}/>)
        }
     
      </div>
    </div>
  );
};

export default PostStats;