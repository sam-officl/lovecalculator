export function calculateLove(name1: string, name2: string): number {
  let score = 0;
  const cleanName1 = name1.toLowerCase().trim();
  const cleanName2 = name2.toLowerCase().trim();

  for (let i = 0; i < Math.min(cleanName1.length, cleanName2.length); i++) {
    score += (cleanName1.charCodeAt(i) + cleanName2.charCodeAt(i)) % 100;
  }

  return Math.min(100, score % 101);
}

export function getLoveMessage(score: number): string {
  if (score < 20) return "Run away! 😱";
  if (score < 40) return "Just friends 😅";
  if (score < 60) return "Good match! 👍";
  if (score < 80) return "Hot couple! 🔥";
  return "Perfect match! 💍";
}

export function getDetailedMessage(score: number): string {
  if (score < 20) return "Maybe try someone else?";
  if (score < 40) return "Better as buddies!";
  if (score < 60) return "There's potential here!";
  if (score < 80) return "Love is in the air!";
  if (score < 95) return "Soulmates detected!";
  return "Marry tomorrow! 💒";
}
