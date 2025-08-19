export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { messages } = req.body || {};
  const last = (messages?.[messages.length - 1]?.content || "").toLowerCase();

  let reply = "Jasné! 🌱 Povedz mi, s čím chceš pomôcť.";
  if (last.includes("zalieva") || last.includes("gießen")) reply = "Zalievaj, keď je vrch pôdy suchý. 💧";
  if (last.includes("svetlo") || last.includes("licht")) reply = "Svetlé miesto bez priameho poludňajšieho slnka je ideál. ☀️";

  return res.status(200).json({ reply });
}
