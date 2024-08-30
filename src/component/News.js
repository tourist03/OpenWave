import React, { Component } from "react";
import NewsItem from "./NewsItem";
import LoadingSpinner from "./LoadingSpinner";
import PropTypes from 'prop-types'

export class News extends Component {

  static  defaultProps = {
    pageSize : 8 ,
    category : 'Science',
    date : '2024-08-20'
  }
  static  propTypes = {
    pageSize :PropTypes.number ,
    category : PropTypes.string,
    date : PropTypes.any,
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      hasMoreArticles: true,
    };
  }

  async componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = async () => {
    try {
     //const url = `https://newsapi.org/v2/everything?q=${this.props.category}&apiKey=d8f429a783e54d9daae50adde8627f2e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
     const url = `https://newsapi.org/v2/everything?q=${this.props.category}&from=${this.props.date}&sortBy=publishedAt&apiKey=670b2f702b4444e2a5e2d1cc01ef8722&page=${this.state.page}&pageSize=${this.props.pageSize}`;
     this.setState({ loading: true });
      const data = await fetch(url);
      const parseData = await data.json();
      if (parseData.articles && Array.isArray(parseData.articles)) {
        const uniqueArticles = parseData.articles.filter(
          (article, index, self) =>
            index === self.findIndex((t) => t.url === article.url)
        );

        this.setState({
          articles: uniqueArticles,
          totalResults: parseData.totalResults,
          hasMoreArticles: uniqueArticles.length > 0,
          loading: false,
        });
      } else {
        console.error("Unexpected data structure:", parseData);
        this.setState({
          articles: [],
          totalResults: 0,
          hasMoreArticles: false,
          loading: false,
        });
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      this.setState({
        articles: [],
        totalResults: 0,
        hasMoreArticles: false,
        loading: false,
      });
    }
  };

  handleNextClick = async () => {
    console.log("next");
    if (
      this.state.page + 1 <=
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
      this.setState(
        (prevState) => ({ page: prevState.page + 1 }),
        this.fetchArticles
      );
    }
  };

  handlePrevClick = async () => {
    console.log("Prev");
    if (this.state.page > 1) {
      this.setState(
        (prevState) => ({ page: prevState.page - 1 }),
        this.fetchArticles
      );
    }
  };

  render() {
    return (
      <div className="container my-4">
        <h1 className="text-center" style={{margin : '35px 40px'}}>OpenWave - Top Headline</h1>
        {this.state.loading && <LoadingSpinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    ImageURL={element.urlToImage}
                    newsURL={element.url}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-outline-success"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={!this.state.hasMoreArticles}
            type="button"
            className="btn btn-outline-success"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
