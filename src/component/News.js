import React, { Component } from "react";
import NewsItem from "./NewsItem";
import LoadingSpinner from "./LoadingSpinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    pageSize: 8,
    category: "Science",
    category2: "football",
    date: "2024-08-20",
  };
  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
    category2: PropTypes.string,
    date: PropTypes.any,
  };
  capatilize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      hasMoreArticles: true,
    };
    document.title = `${this.capatilize(this.props.category)} - OpenWave`;
  }

  async componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = async () => {
    try {
      //const url = `https://newsapi.org/v2/everything?q=${this.props.category}&apiKey=d8f429a783e54d9daae50adde8627f2e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      //const url = `https://newsapi.org/v2/everything?q=${this.props.category}&from=${this.props.date}&sortBy=publishedAt&apiKey=670b2f702b4444e2a5e2d1cc01ef8722&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      const url = `https://newsapi.org/v2/everything?q=${this.props.category}&q=${this.props.category2}&from=2024-08-20&sortBy=publishedAt&apiKey=670b2f702b4444e2a5e2d1cc01ef8722&page=${this.state.page}&pageSize=${this.props.pageSize}`;
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

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/everything?q=${this.props.category}&q=${this.props.category2}&from=2024-08-20&sortBy=publishedAt&apiKey=670b2f702b4444e2a5e2d1cc01ef8722&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    const data = await fetch(url);
    const parseData = await data.json();

    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 40px" }}>
          OpenWave - Top {this.capatilize(this.props.category)} Headline
        </h1>
        {this.state.loading && <LoadingSpinner/> }
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<LoadingSpinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      ImageURL={element.urlToImage}
                      newsURL={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
