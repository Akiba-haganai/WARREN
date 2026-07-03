export function diceCoefficient(a: string, b: string): number {
  const bigrams = (s: string) => {
    const map = new Map<string, number>();
    for (let i = 0; i < s.length - 1; i++) {
      const bigram = s.substring(i, i + 2).toLowerCase();
      map.set(bigram, (map.get(bigram) || 0) + 1);
    }
    return map;
  };

  const aBigrams = bigrams(a);
  const bBigrams = bigrams(b);
  let intersection = 0;
  for (const [bigram, count] of aBigrams) {
    intersection += Math.min(count, bBigrams.get(bigram) || 0);
  }
  const total = a.length + b.length - 2;
  return total > 0 ? (2 * intersection) / total : 0;
}