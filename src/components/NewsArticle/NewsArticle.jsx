import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import StyledCard from "../StyledCard/StyledCard";

function formatPublishedDate(publishedAt) {
  if (!publishedAt) {
    return "Unknown date";
  }

  const date = new Date(publishedAt);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return date.toLocaleDateString();
}

export default function NewsArticle({
  image,
  title,
  description,
  url,
  author,
  publishedAt,
}) {
  return (
    <StyledCard>
      <CardActionArea
        component="a"
        href={url || "#"}
        target="_blank"
        rel="noopener noreferrer"
        disabled={!url}
      >
        {image && (
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt={title || "News article"}
          />
        )}

        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {title || "Untitled article"}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {description || "No description available."}
          </Typography>
        </CardContent>
      </CardActionArea>

      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary" display="block">
          {author || "Unknown Author"}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {formatPublishedDate(publishedAt)}
        </Typography>
      </Box>
    </StyledCard>
  );
}
