export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { message, stats } = req.body || {};
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY missing' });

    const system = `You are Greenbuddy, a warm, premium, playful plant-care assistant in German. Keep answers short and practical. Use stats if provided: ${JSON.stringify(stats||{})}`;

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: system }, { role: 'user', content: message||'' }],
        temperature: 0.7
      })
    });
    const j = await r.json();
    const reply = j?.choices?.[0]?.message?.content || 'Bitte nochmal fragen.';
    res.status(200).json({ reply });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
