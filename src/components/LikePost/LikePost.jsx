import React, { useEffect, useState } from 'react'
import styles from './LikePost.module.css';
import ModalShare from '../ModalShare/ModalShare';
import ReportModal from '../ReportModal/ReportModal';
import { likePost, unlikePost, getUserLikeForPost, getLikesCount } from "../../api/posts";

const LikePost = ({postId, token}) => {
  const [liked, setLiked] = useState(null); // true, false ou null
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);


  const fetchLikesCount = async () => {
    try {
      const res = await getLikesCount(postId);
      setLikeCount(res.likes);
      setDislikeCount(res.dislikes);
    } catch {
      setLikeCount(0);
      setDislikeCount(0);
    }
  };

  useEffect(() => {
    // Buscar se o usuário já deu like/dislike
    async function fetchUserLike() {
      try {
        const res = await getUserLikeForPost(postId, token);
        setLiked(res.likeorNot);
      } catch {
        setLiked(null);
      }
    }
    fetchUserLike();
    fetchLikesCount();
  }, [postId, token]);

  const handleLike = async () => {
    if (liked === true) {
      await unlikePost(postId, token);
      setLiked(null);
    } else {
      await likePost(postId, true, token);
      setLiked(true);
    }
    fetchLikesCount();
  };

  const handleDislike = async () => {
    if (liked === false) {
      await unlikePost(postId, token);
      setLiked(null);
    } else {
      await likePost(postId, false, token);
      setLiked(false);
    }
    fetchLikesCount();
  };

  return (
    <div className='d-flex flex-row gap-2 justify-content-start align-items-center p-2'>
        <button className={`rounded-3 ${styles.likeButton} d-flex align-items-center justify-content-center`}>
            <i className={`bi ${liked === true ? 'bi-hand-thumbs-up-fill text-primary' : 'bi-hand-thumbs-up text-light'} btn fs-6`}
          onClick={handleLike}>  <span className={`fs-6 ${likeCount == 0? 'd-none' : 'd-inline'}`}>{likeCount}</span></i> 
            <i className={`bi ${liked === false ? `bi-hand-thumbs-down-fill text-danger` : `bi-hand-thumbs-down text-light`} btn fs-6  `}
          onClick={handleDislike}><span className={` ${dislikeCount == 0? 'd-none' : 'd-inline'}`}>{dislikeCount}</span></i>
            </button>
        <button className={`rounded-3 d-flex align-items-center justify-content-center text-light fs-4 ${styles.ActBtn}`} data-bs-toggle="modal" data-bs-target="#ShareModal">
          <span className='me-2 fs-6'>Share</span><i className='bi bi-share'></i>
          </button>
          <button className={`rounded-3 d-flex align-items-center justify-content-center text-light fs-4 ${styles.ActBtn}`} data-bs-toggle="modal" data-bs-target="#ReportModal">
          <span className='me-2 fs-6'>Report</span><i className='bi bi-flag'></i>
          </button>
           <div className="modal fade" id="ShareModal" tabIndex="-1" aria-labelledby="ShareModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg">
        <div className="modal-content">
        <ModalShare />
        </div>
            </div>
            </div>

            <div className="modal fade" id="ReportModal" tabIndex="-1" aria-labelledby="ReportModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg">
        <div className="modal-content">
        <ReportModal />
        </div>
            </div>
            </div>
    </div>
  )
}

export default LikePost