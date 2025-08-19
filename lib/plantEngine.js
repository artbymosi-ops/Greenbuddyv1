export function computeMood({ water, food, spray, pests, disease }) {
  if (pests > 60 || disease > 40) return "sick";
  if (water < 30 || food < 30) return "sad";
  if (water > 70 && food > 70 && spray > 60 && pests < 30) return "happy";
  return "ok";
}

// volaj každých X sekúnd / po akcii
export function tick(stats) {
  const s = { ...stats };

  // prirodzený pokles
  s.water = Math.max(0, s.water - 0.4);
  s.food  = Math.max(0, s.food  - 0.25);
  s.spray = Math.max(0, s.spray - 0.5);

  // škodcovia rastú, ak spray nízky
  if (s.spray < 40) s.pests = Math.min(100, s.pests + 0.6);
  else s.pests = Math.max(0, s.pests - 0.4);

  // choroba stúpa pri nízkej vode alebo vysokých škodcoch
  if (s.water < 25 || s.pests > 70) s.disease = Math.min(100, s.disease + 0.5);
  else s.disease = Math.max(0, s.disease - 0.2);

  // XP a level (bonusy za dobrú starostlivosť)
  const good = (s.water > 60) + (s.food > 60) + (s.spray > 60) + (s.pests < 30) + (s.disease < 20);
  s.xp += good >= 3 ? 1 : 0.2;
  if (s.xp >= 100) { s.level += 1; s.xp = 0; }

  s.mood = computeMood(s);
  return s;
}

export const actions = {
  water: (s) => ({ ...s, water: Math.min(100, s.water + 20), xp: s.xp + 2 }),
  food:  (s) => ({ ...s, food:  Math.min(100, s.food  + 15), xp: s.xp + 2 }),
  spray: (s) => ({ ...s, spray: Math.min(100, s.spray + 25), pests: Math.max(0, s.pests - 15), xp:s.xp+2 }),
  repot: (s)=> ({ ...s, food: Math.min(100, s.food + 30), xp: s.xp + 10 }),
};
