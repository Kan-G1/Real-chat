// Vercel serverless function: POST /api/authenticate
// Creates (or fetches) a ChatEngine user. The private key stays server-side —
// it must never be exposed to the browser, so it is NOT prefixed with VITE_.

const CHAT_ENGINE_USERS_URL = "https://api.chatengine.io/users/";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const privateKey = process.env.CHAT_ENGINE_PRIVATE_KEY;
  if (!privateKey) {
    return res.status(500).json({ error: "Server is missing CHAT_ENGINE_PRIVATE_KEY" });
  }

  const { username } = req.body ?? {};
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const r = await fetch(CHAT_ENGINE_USERS_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "private-key": privateKey,
      },
      body: JSON.stringify({
        username: username,
        secret: username,
        first_name: username,
        last_name: username,
      }),
    });

    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (e) {
    return res.status(502).json({ error: "Could not reach ChatEngine" });
  }
}
