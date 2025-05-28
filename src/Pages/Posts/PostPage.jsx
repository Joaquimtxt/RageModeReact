import React, { useState } from "react";
import { useLocation, useParams } from "react-router";
import styles from "./Posts.module.css";
import LikePost from "../../components/LikePost/LikePost";
import CommentBar from "../../components/Comments/CommentBar";
import Comments from "../../components/Comments/Comments";

const PostPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const [subscribed, setSubscribed] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const handleSubscribe = () => {
    if (!subscribed) {
      setSubscribed(true);
      setFollowersCount(followersCount + 1);
    } else {
      setSubscribed(false);
      setFollowersCount(followersCount - 1);
    }
  };
  const { Id = id, userName, postDate, postTitle, postContent, postTags } =
    location.state || {};
  return (
    <div className="container vw-100 text-light" id={Id}>
      <div className={`border border-light rounded-3 my-4`}>
        <div className={` d-flex gap-4 mx-2 mt-0 p-1 align-items-center`}>
          <img
            src="https://placehold.co/30x30"
            className="img-fluid rounded-circle"
            alt="profile picture"
          ></img>
          <div className="d-flex flex-column align-items-start justify-content-start">
            <h5 className="py-1 fs-6 m-0">@{userName}</h5>
            <p className="fw-lighter fs-6 m-0">{followersCount} {followersCount == 1? "follower" : "followers"}</p>
          </div>
          <p className="fw-lighter mt-2">{postDate} ago</p>
          <button className={`btn fw-lighter mt-2 ${subscribed? "btn-secondary" : "btn-light"}`} onClick={handleSubscribe}>{subscribed?"Followed" : "Follow"}</button>
        </div>
        <div className={` ms-4 text-start mb-4 mb-md-3`}>
          <div className="  fs-3 fw-bolder mt-2 mb-3">{postTitle}</div>
          <div className="col-7 col-md-3">
            <p className="bg-danger ms-auto  px-2 px-md-1 rounded-1 fw-medium text-center text-md-start d-flex flex-row gap-2">
              <i className="bi bi-tags-fill"></i>
              {postTags}
            </p>
          </div>
        </div>
        <div className={`mx-auto ${styles.PostContent}`}>
          <div className="text-center post-img">
            <img
              className="img-fluid rounded-1 object-fit-contain postImg"
              src="https://placehold.co/1200x700"
              alt=""
            />
          </div>
          <div className="w-100 mt-3 text-light">{postContent}</div>
        </div>
      </div>
      <div className="w-100 mt-3">
        <LikePost />
      </div>
      <div className="w-100 mt-3">      
        <h5 className="text-light">Comments:</h5>
  <CommentBar />
  <Comments userName={"Luiz"} postDate={"3 min"} commentContent={"Mannnnnnn Im your fan, you're so cool, that match you made on SF3 was astonishing!!"} />
        </div>
    </div>
  );
};

export default PostPage;
