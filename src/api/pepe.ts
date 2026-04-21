const BASE_URL = "http://localhost:8000";
const API_KEY = "pepe-default-key";

const headers = {
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
};

export async function sendMessage(message: string, sessionId = "pepe-desktop") {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers,
    body: JSON.stringify({ message, session_id: sessionId }),
  });
  const data = await res.json();
  return data.response as string;
}

export async function checkHealth() {
  const res = await fetch(`${BASE_URL}/health`, { headers });
  return res.ok;
}