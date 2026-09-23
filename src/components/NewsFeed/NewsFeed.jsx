import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NewsArticle from "../NewsArticle/NewsArticle";
import LoadingArticle from "../LoadingArticle/LoadingArticle";

export default function NewsFeed({ articles, loading, pageSize }) {
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 7.5 },
      }}
    >
      {loading &&
        Array.from({ length: pageSize }, (_, index) => (
          <LoadingArticle key={index} />
        ))}

      {!loading && articles.length === 0 && (
        <Typography
          align="center"
          variant="h6"
          color="text.secondary"
          sx={{ mt: 4 }}
        >
          No articles found.
        </Typography>
      )}

      {!loading &&
        articles.map((article) => (
          <NewsArticle
            key={article.url || `${article.title}-${article.publishedAt}`}
            {...article}
          />
        ))}
    </Box>
  );
}
