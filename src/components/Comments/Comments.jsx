import React from 'react'
import LikePost from '../LikePost/LikePost'
import { getTimeAgo } from '../../utils/dateUtils'

const Comments = (props) => {
  return (
    <div className="container container-md vw-100">
        <div className="row">
          <div className="col-md-7">
            <div className="border border-light rounded-3 my-3 p-3">
              <div
                className={` d-flex gap-4 mx-2 mt-0 p-1 align-items-center`}
              >
                <img
                  src="https://placehold.co/30x30"
                  className="img-fluid rounded-circle"
                ></img>
                <h5 className="text-center py-2 fs-6">@{props.userName}</h5>
                <p className="fw-lighter mt-2">{getTimeAgo(props.postDate)} ago</p>
              </div>
              <div>
                <div className={` ms-4 text-start mb-4 mb-md-3`}>
                  <div className="w-100">
                    {props.commentContent}
                  </div>
                </div>
              </div>
              <LikePost />
              </div>
        </div>
        </div>
        </div>
  )
}

export default Comments