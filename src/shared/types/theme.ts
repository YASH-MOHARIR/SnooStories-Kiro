export interface Theme {
  name: string;
  emoji: string;
  snooDescription: string;
  promptContext: string;
}

export const THEMES: Record<string, Theme> = {
  halloween: {
    name: 'Halloween',
    emoji: '🎃',
    snooDescription: 'Witch Snoo with a spooky cauldron',
    promptContext: 'spooky, Halloween-themed with ghosts, witches, or monsters',
  },
  christmas: {
    name: 'Christmas',
    emoji: '🎄',
    snooDescription: 'Santa Snoo with festive gifts',
    promptContext: 'festive, Christmas-themed with Santa, snow, or presents',
  },
  valentines: {
    name: "Valentine's Day",
    emoji: '💘',
    snooDescription: 'Cupid Snoo with hearts',
    promptContext: 'romantic, Valentine-themed with love, hearts, or romance',
  },
  stpatricks: {
    name: "St. Patrick's Day",
    emoji: '🍀',
    snooDescription: 'Leprechaun Snoo with clovers',
    promptContext: 'Irish-themed with luck, leprechauns, or rainbows',
  },
  easter: {
    name: 'Easter',
    emoji: '🐰',
    snooDescription: 'Bunny Snoo with Easter eggs',
    promptContext: 'Easter-themed with bunnies, eggs, or spring',
  },
  summer: {
    name: 'Summer',
    emoji: '☀️',
    snooDescription: 'Beach Snoo with sunglasses',
    promptContext: 'summer-themed with beaches, sun, or vacation',
  },
  default: {
    name: 'Classic',
    emoji: '⭐',
    snooDescription: 'Classic Snoo',
    promptContext: 'fun and creative',
  },
};

export function getCurrentTheme(): Theme {
  const now = new Date();
  const month = now.getMonth() + 1; // 1-12
  const day = now.getDate();

  // Halloween (October)
  if (month === 10) return THEMES['halloween']!;

  // Christmas (December)
  if (month === 12) return THEMES['christmas']!;

  // Valentine's Day (February 14 ± 3 days)
  if (month === 2 && day >= 11 && day <= 17) return THEMES['valentines']!;

  // St. Patrick's Day (March 17 ± 3 days)
  if (month === 3 && day >= 14 && day <= 20) return THEMES['stpatricks']!;

  // Easter (April, approximate)
  if (month === 4) return THEMES['easter']!;

  // Summer (June, July, August)
  if (month >= 6 && month <= 8) return THEMES['summer']!;

  // Default
  return THEMES['default']!;
}
