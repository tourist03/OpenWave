import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = async () => {
    try {
      const url = `https://newsapi.org/v2/everything?q=tesla&from=2024-07-28&sortBy=publishedAt&apiKey=d8f429a783e54d9daae50adde8627f2e&page=${this.state.page}&pageSize=20`;
      const data = await fetch(url);
      const parseData = await data.json();
      //this.setState({ articles: parseData.articles });
      if (parseData.articles && Array.isArray(parseData.articles)) {
        const uniqueArticles = parseData.articles.filter(
          (article, index, self) =>
            index === self.findIndex((t) => t.url === article.url)
        );

        this.setState({
          articles: uniqueArticles,
          totalResults: parseData.totalResults || 0,
        });
      } else {
        // Handle unexpected data structure
        console.error("Unexpected data structure:", parseData);
        this.setState({ articles: [], totalResults: 0 });
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      this.setState({ articles: [], totalResults: 0 });
    }
  };

  handleNextClick = async () => {
    console.log("next");
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / 20)) {
      this.setState(
        (prevState) => ({ page: prevState.page + 1 }),
        this.fetchArticles
      );
    }

    // } else {
    //   let url = `https://newsapi.org/v2/everything?q=tesla&from=2024-07-28&sortBy=publishedAt&apiKey=d8f429a783e54d9daae50adde8627f2e&page=${
    //     this.state.page + 1
    //   }&pageSize=20`;
    //   let data = await fetch(url);
    //   let parseData = await data.json();
    //   this.setState({ articles: parseData.articles });
    //   const uniqueArticles = parseData.articles.filter(
    //     (article, index, self) =>
    //       index === self.findIndex((t) => t.url === article.url)
    //   );

    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: uniqueArticles,
    //   });
    // }
  };

  handlePrevClick = async () => {
    console.log("Prev");
    if (this.state.page > 1) {
      this.setState(
        (prevState) => ({ page: prevState.page - 1 }),
        this.fetchArticles
      );
    }
    // let url = `https://newsapi.org/v2/everything?q=tesla&from=2024-07-28&sortBy=publishedAt&apiKey=d8f429a783e54d9daae50adde8627f2e&page=${
    //   this.state.page - 1
    // }&pageSize=20`;
    // let data = await fetch(url);
    // let parseData = await data.json();
    // this.setState({ articles: parseData.articles });
    // const uniqueArticles = parseData.articles.filter(
    //   (article, index, self) =>
    //     index === self.findIndex((t) => t.url === article.url)
    // );

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: uniqueArticles,
    // });
  };

  render() {
    return (
      <div className="container my-4">
        <h2>OpenWave - Top Headline</h2>
        <div className="row">
          {this.state.articles.map((element) => {
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
