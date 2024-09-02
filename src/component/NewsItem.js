import React from "react";

const NewsItem = (props) => {
  let { title, description, ImageURL, newsURL, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span
            className="badge rounded-pill bg-info"
            style={{ left: "90%", zIndex: "1" }}
          >
            {source}
          </span>
        </div>

        <img
          src={
            !ImageURL ? "https://images.mktw.net/im-18007061/social" : ImageURL
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-body-secondary">
              By <strong>{!author ? "Not Available" : author} </strong> on
              <strong>{new Date(date).toGMTString()}</strong>
            </small>
          </p>
          <a
            href={newsURL}
            rel="noreferrer"
            target="_blank"
            className="btn btn-sm btn-outline-info"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
