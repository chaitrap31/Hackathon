// Bloom's Taxonomy levels with metadata
export const bloomLevels = [
  {
    key: 'remember',
    label: 'Remember',
    color: '#94a3b8',
    bgColor: '#f1f5f9',
    description: 'Recall facts and basic concepts',
    icon: '📝',
    order: 1,
  },
  {
    key: 'understand',
    label: 'Understand',
    color: '#60a5fa',
    bgColor: '#eff6ff',
    description: 'Explain ideas or concepts',
    icon: '💡',
    order: 2,
  },
  {
    key: 'apply',
    label: 'Apply',
    color: '#34d399',
    bgColor: '#ecfdf5',
    description: 'Use information in new situations',
    icon: '🔧',
    order: 3,
  },
  {
    key: 'analyze',
    label: 'Analyze',
    color: '#fbbf24',
    bgColor: '#fffbeb',
    description: 'Draw connections among ideas',
    icon: '🔍',
    order: 4,
  },
  {
    key: 'evaluate',
    label: 'Evaluate',
    color: '#f97316',
    bgColor: '#fff7ed',
    description: 'Justify a stand or decision',
    icon: '⚖️',
    order: 5,
  },
  {
    key: 'create',
    label: 'Create',
    color: '#a855f7',
    bgColor: '#faf5ff',
    description: 'Produce new or original work',
    icon: '🚀',
    order: 6,
  },
];

export function getBloomLevel(key) {
  return bloomLevels.find((l) => l.key === key);
}

export function calculateBloomScore(responses) {
  // responses is an object like { remember: 'completed', understand: 'partial', ... }
  const weights = { remember: 1, understand: 2, apply: 3, analyze: 4, evaluate: 5, create: 6 };
  let earned = 0;
  let total = 0;

  Object.entries(responses).forEach(([key, status]) => {
    const weight = weights[key] || 1;
    total += weight;
    if (status === 'completed') earned += weight;
    else if (status === 'partial') earned += weight * 0.5;
  });

  return total > 0 ? Math.round((earned / total) * 100) : 0;
}
