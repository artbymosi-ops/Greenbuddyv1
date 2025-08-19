export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { messages } = req.body;

  // Simulácia odpovede – neskôr sa napojí AI
  const lastMessage = messages[messages.length - 1].content;
  let reply = "Rozumiem! 🌱 Povedz mi viac.";

  if (lastMessage.toLowerCase().includes("zalievanie")) {
    reply = "Rastliny je ideálne zalievať, keď je pôda suchá na dotyk. 💧";
  }
  if (lastMessage.toLowerCase().includes("svetlo")) {
    reply = "Väčšina izbových rastlín má rada svetlé miesto, ale bez priameho slnka. ☀️";
  }

  res.status(200).json({ reply });
}
