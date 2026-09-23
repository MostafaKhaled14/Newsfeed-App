import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NewsHeader from "./components/NewsHeader/NewsHeader";
import NewsFeed from "./components/NewsFeed/NewsFeed";

const PAGE_SIZE = 5;
const NEWS_API_URL = "https://newsapi.org/v2/top-headlines";

const CATEGORIES = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("general");

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          country: "us",
          pageSize: String(PAGE_SIZE),
          category,
          page: String(page),
          apiKey: import.meta.env.VITE_NEWS_API_KEY,
        });

        if (query.trim()) {
          params.set("q", query.trim());
        }

        const response = await fetch(`${NEWS_API_URL}?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}.`);
        }

        const data = await response.json();

        if (data.status !== "ok") {
          throw new Error(data.message || "Failed to load news articles.");
        }

        const nextArticles = (data.articles ?? []).map(
          ({ title, description, urlToImage: image, url, author, publishedAt }) => ({
            title,
            description,
            image,
            url,
            author,
            publishedAt,
          })
        );

        setArticles(nextArticles);
      } catch (requestError) {
        if (requestError.name === "AbortError") {
          return;
        }

        setArticles([]);
        setError(requestError.message || "Something went wrong while loading the news.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 500);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query, category, page]);

  const handleSearchChange = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setPage(1);
  };

  const handleNextPage = () => {
    setPage((currentPage) => currentPage + 1);
  };

  const handlePrevPage = () => {
    setPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1550px",
        minHeight: "100vh",
        padding: "0 !important",
        backgroundColor: "#f5f5f5",
      }}
    >
      <NewsHeader
        category={category}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
      />

      {error && (
        <Typography color="error" align="center" sx={{ px: 2, py: 2 }}>
          {error}
        </Typography>
      )}

      {!error && (
        <NewsFeed
          articles={articles}
          loading={loading}
          pageSize={PAGE_SIZE}
        />
      )}

      {!error && (
        <div className="pagination">
          <Button
            variant="contained"
            onClick={handlePrevPage}
            disabled={loading || page === 1}
          >
            Previous
          </Button>

          <Button
            variant="contained"
            onClick={handleNextPage}
            disabled={loading || articles.length < PAGE_SIZE}
          >
            Next
          </Button>
        </div>
      )}
    </Container>
  );
}

export default App;
