// pages/api/chat.js
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages = [], plant = {} } = req.body || {};

    const systemPrompt = `
Du bist **Greenbuddy**, ein freundlicher Pflanzen-Assistent.
- **Sprache:** Antworte immer auf **Deutsch** (kurz, klar, freundlich).
- Wenn Nutzer nicht Deutsch schreibt, antworte trotzdem auf Deutsch.
- Nutze – falls vorhanden – die Pflanzendaten:
  Feuchtigkeit=${plant.hydration ?? "?"} / Nährstoffe=${plant.nutrition ?? "?"} / Sauberkeit=${plant.cleanliness ?? "?"} / XP=${plant.xp ?? "?"} / Level=${plant.level ?? "?"}.
- Gib konkrete, sichere Pflege-Tipps (Gießhäufigkeit, Licht, Dünger, typische Ursachen/Diagnosen).
- Falls Infos fehlen, stelle **eine** klärende Rückfrage.
- Kein medizinischer oder gefährlicher Rat, keine erfundenen Messwerte.
    `.trim();

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.6,
      max_tokens: 300,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
    });

    const reply = completion.choices?.[0]?.message?.content?.trim() || "";
    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return res.status(500).json({ error: "AI request failed" });
  }
}
