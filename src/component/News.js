import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import LoadingSpinner from "./LoadingSpinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({
  pageSize = 8,
  category = "Science",
  category2 = "football",
  date = "2024-08-20",
  apikey,
  setProgress
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capatilize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.title = `${capatilize(category)} - OpenWave`
    fetchArticles();
    // eslint-disable-next-line
  }, []);

  const fetchArticles = async () => {
    try {
      setProgress(10);
      const url = `https://newsapi.org/v2/everything?q=${category}&q=${category2}&from=2024-08-20&sortBy=publishedAt&apiKey=${apikey}&page=${page}&pageSize=${pageSize}`;
      const data = await fetch(url);
      setProgress(40);
      const parseData = await data.json();
      setProgress(65);
      if (parseData.articles && Array.isArray(parseData.articles)) {
        const uniqueArticles = parseData.articles.filter(
          (article, index, self) =>
            index === self.findIndex((t) => t.url === article.url)
        );

        setArticles(uniqueArticles);
        setTotalResults(parseData.totalResults);
        setLoading(false);

        setProgress(100);
      } else {
        console.error("Unexpected data structure:", parseData);

        setArticles([]);
        setTotalResults(0);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);

      setArticles([]);
      setTotalResults(0);
      setLoading(false);
    }
  };

  const fetchMoreData = async () => {
    
    const url = `https://newsapi.org/v2/everything?q=${category}&q=${category2}&from=2024-08-20&sortBy=publishedAt&apiKey=670b2f702b4444e2a5e2d1cc01ef8722&page=${page+1}&pageSize=${pageSize}`;
    setPage(page + 1);
    const data = await fetch(url);
    const parseData = await data.json();
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 40px", marginTop: "90px" }}
      >
        OpenWave - Top {capatilize(category)} Headline
      </h1>
      {loading && <LoadingSpinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<LoadingSpinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
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
};

News.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string,
  category2: PropTypes.string,
  date: PropTypes.any,
};

export default News;
