import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, ImageURL, newsURL } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img
            src={
              !ImageURL
                ? "https://images.mktw.net/im-18007061/social"
                : ImageURL
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
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
  }
}

export default NewsItem;
