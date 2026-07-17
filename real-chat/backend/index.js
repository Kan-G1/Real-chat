const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const PORT = process.env.PORT || 3001;
const PRIVATE_KEY = process.env.CHAT_ENGINE_PRIVATE_KEY;

if (!PRIVATE_KEY) {
  console.warn("CHAT_ENGINE_PRIVATE_KEY is not set - /authenticate will fail.");
}

app.get("/health", (req, res) => {
  res.json({ ok: true, keyConfigured: Boolean(PRIVATE_KEY) });
});

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  if (!PRIVATE_KEY) {
    return res.status(500).json({ error: "Server is missing CHAT_ENGINE_PRIVATE_KEY" });
  }

  try {
    const r = await axios.put(
      'https://api.chatengine.io/users/',
      { username: username, secret: username, first_name: username, last_name: username },
      { headers: { "private-key": PRIVATE_KEY } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response ? e.response.status : 500).json(e.response ? e.response.data : { error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
