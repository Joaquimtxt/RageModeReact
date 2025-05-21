import styles from "./ForumContainer.module.css";

const ForumContainer = (props) => {
  return (
    <div className="container container-md vw-100">

      <div className=" border border-light rounded-3 my-4">
        <div className="row">
          <div className="col-md-7">
            <div className="container">
              <div
                className={`${styles.infoPost} d-flex gap-4 mx-2 mt-0 p-1 align-items-center`}
              >
                <img
                  src="https://placehold.co/30x30"
                  className="img-fluid rounded-circle"
                ></img>
                <h5 className="text-center py-2 fs-6">@{props.userName}</h5>
                <p className="fw-lighter mt-2"> há {props.postDate}</p>
              </div>
              <div className="row">
          <div className="col-12 mx-3 w-auto">
            <p className="bg-danger ms-auto  px-2 px-md-1 rounded-1 fw-medium text-center text-md-start d-flex flex-row gap-2">
                <i className="bi bi-tags-fill"></i>
              {props.postTags}
            </p>
          </div>
        </div>
              <div className={`${styles.postContent} ms-4 text-start mb-4 mb-md-3`}>
                <div className="  fs-3 fw-bolder mt-2 mb-3">
                  {props.postTitle}
                </div>
                <div className="text-truncate w-100">
                  {props.postContent}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 text-end post-img">
            <img
              className="img-fluid rounded-1 object-fit-contain postImg"
              src="https://placehold.co/600x300"
            />
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default ForumContainer;
