const ALLOWED_ORIGINS = ["https://mostafakhaled14.github.io", "http://localhost:5173"];

const ALLOWED_CATEGORIES = ["general", "world", "nation", "business", "entertainment", "health", "science", "sports", "technology"];

export default async function handler(req, res) {
  const origin = req.headers.origin;

  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  const { category = "general", q = "", page = "1", max = "5" } = req.query;

  const safeCategory = ALLOWED_CATEGORIES.includes(category) ? category : "general";
  const safeMax = Math.min(Math.max(parseInt(max, 10) || 5, 1), 10);
  const safePage = Math.max(parseInt(page, 10) || 1, 1);

  const params = new URLSearchParams({
    country: "us",
    lang: "en",
    category: safeCategory,
    max: String(safeMax),
    page: String(safePage),
    apikey: process.env.GNEWS_API_KEY,
  });

  if (String(q).trim()) {
    params.set("q", String(q).trim());
  }

  try {
    const response = await fetch(`https://gnews.io/api/v4/top-headlines?${params}`);
    const data = await response.json();

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
    return res.status(response.status).json(data);
  } catch {
    return res.status(500).json({ errors: ["Failed to reach the news service."] });
  }
}
