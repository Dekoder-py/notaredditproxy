export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);
  const subreddit = url.pathname.split('/api/')[1];

  const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
  });

  const text = await response.text();

  try {
    const data = JSON.parse(text);
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Non-JSON response', status: response.status }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
