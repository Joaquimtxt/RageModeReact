import React, { useState } from 'react'
import styles from './LikePost.module.css';
import ModalShare from '../ModalShare/ModalShare';

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
    <div className='d-flex flex-row gap-2 justify-content-start align-items-center p-2'>
        <button className={`rounded-3 ${styles.likeButton} d-flex align-items-center justify-content-center`}>
            <i className={`bi ${liked ? 'bi-hand-thumbs-up-fill text-primary' : 'bi-hand-thumbs-up text-light'} btn fs-6`}
          onClick={handleLike}>  <span className={`fs-6 ${likeCount == 0? 'd-none' : 'd-inline'}`}>{likeCount}</span></i> 
            <i className={`bi ${disliked ? 'bi-hand-thumbs-down-fill text-danger' : 'bi-hand-thumbs-down text-light'} btn fs-6  `}
          onClick={handleDislike}></i>
            </button>
        <button className={`rounded-3 d-flex align-items-center justify-content-center text-light fs-4 ${styles.ActBtn}`} data-bs-toggle="modal" data-bs-target="#ShareModal">
          <span className='me-2 fs-6'>Share</span><i className='bi bi-share'></i>
          </button>
          
           <div className="modal fade" id="ShareModal" tabIndex="-1" aria-labelledby="ShareModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg">
        <div className="modal-content">
        <ModalShare />
        </div>
            </div>
            </div>
    </div>
  )
}

export default LikePost