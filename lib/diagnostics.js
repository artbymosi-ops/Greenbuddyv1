export function diagnose(s) {
  const tips = [];
  if (s.pests > 60) tips.push("Vidím veľa škodcov. Použi postrek a izoluj rastlinu od ostatných.");
  if (s.spray < 40) tips.push("Postrek je nízky. Aplikuj šetrný insekticíd alebo mydlový roztok.");
  if (s.water < 30) tips.push("Rastlina je smädná. Skontroluj substrát a zalej mierne.");
  if (s.water > 85) tips.push("Pozor na prelievanie. Nechaj substrát preschnúť.");
  if (s.food < 30) tips.push("Chýbajú živiny. Prihnoj vyváženým hnojivom na zelené rastliny.");
  if (s.disease > 40) tips.push("Možná hniloba/plesne. Zlepši cirkuláciu vzduchu, odstráň napadnuté listy.");
  if (!tips.length) tips.push("Vyzerá zdravo! Pokračuj v rytme – rozptýlené svetlo, mierna zálievka, vlhkosť 50–60%.");
  return tips;
}
