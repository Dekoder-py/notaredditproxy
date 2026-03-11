export default async function handler(req, res) {
  const { subreddit } = req.query;

  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`, {
      headers: { 'User-Agent': 'reddit-proxy/1.0' },
    });

    const text = await response.text();
    res.setHeader('Content-Type', 'application/json');

    try {
      const data = JSON.parse(text);
      res.status(response.status).json(data);
    } catch {
      res.status(502).json({ error: 'Reddit returned non-JSON response', status: response.status });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
