export interface Tool { name: string; slug: string; description: string; icon: string; category: string; }
export interface Category { id: string; name: string; icon: string; }

export const categories: Category[] = [
  { id: 'numbers', name: 'Numbers & Math', icon: '🔢' },
  { id: 'games', name: 'Games & Fun', icon: '🎲' },
  { id: 'text', name: 'Text & Names', icon: '📝' },
  { id: 'pickers', name: 'Pickers & Decisions', icon: '🎯' },
];

export const tools: Tool[] = [
  { name: 'Random Number', slug: 'random-number', description: 'Generate random numbers within any range.', icon: '🔢', category: 'numbers' },
  { name: 'Random UUID', slug: 'random-uuid', description: 'Generate UUIDs (v4) for development and testing.', icon: '🆔', category: 'numbers' },
  { name: 'Random IP Address', slug: 'random-ip', description: 'Generate random IPv4 and IPv6 addresses.', icon: '🌐', category: 'numbers' },
  { name: 'Dice Roller', slug: 'dice-roller', description: 'Roll dice with customizable sides and quantity.', icon: '🎲', category: 'games' },
  { name: 'Coin Flipper', slug: 'coin-flipper', description: 'Flip a virtual coin with animation.', icon: '🪙', category: 'games' },
  { name: 'Spin the Wheel', slug: 'spin-wheel', description: 'Create a custom spinner wheel for decisions.', icon: '🎡', category: 'games' },
  { name: 'Random Name', slug: 'random-name', description: 'Generate random first and last names.', icon: '👤', category: 'text' },
  { name: 'Random Word', slug: 'random-word', description: 'Generate random English words.', icon: '📖', category: 'text' },
  { name: 'Random Color', slug: 'random-color', description: 'Generate random colors with HEX, RGB, and HSL values.', icon: '🎨', category: 'text' },
  { name: 'List Randomizer', slug: 'list-randomizer', description: 'Shuffle and randomize any list of items.', icon: '📋', category: 'pickers' },
  { name: 'Random Picker', slug: 'random-picker', description: 'Pick random items from a list.', icon: '🎯', category: 'pickers' },
  { name: 'Yes or No', slug: 'yes-or-no', description: 'Get a random yes or no answer to any question.', icon: '❓', category: 'pickers' },
];

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter(t => t.category === categoryId);
}
