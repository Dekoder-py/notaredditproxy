export default async function handler(req, res) {
  const { subreddit } = req.query;

  try {
    const response = await fetch(`https://old.reddit.com/r/${subreddit}.json`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    const text = await response.text();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

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
