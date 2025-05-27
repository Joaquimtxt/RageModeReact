import React, { useState } from 'react'

const LikePost = () => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
  
    const handleLike = () => {
      if (!liked) {
        setLiked(true);
        setDisliked(false);
        setLikeCount(likeCount + 1);
      } else {
        setLiked(false);
        setLikeCount(likeCount - 1);
      }
    };
  
    const handleDislike = () => {
      setDisliked(!disliked);
      if (liked) {
        setLiked(false);
        setLikeCount(likeCount - 1);
      }
    };
  return (
    <div>
        <button className="bg-secondary text-light rounded-5 ">
            <i className={`bi ${liked ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'} btn fs-4`}
          onClick={handleLike}>  <span>{likeCount}</span></i> 
            <i className={`bi ${disliked ? 'bi-hand-thumbs-down-fill' : 'bi-hand-thumbs-down'} btn fs-4`}
          onClick={handleDislike}></i>
            </button>
        
    </div>
  )
}

export default LikePost