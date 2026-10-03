export const reasons = [
  { id: 'damaged', label: 'Arrived damaged' },
  { id: 'late', label: 'Arrived late' },
  { id: 'duplicate', label: 'Charged twice' },
  { id: 'other', label: 'Other' },
] as const;

export type Reason = (typeof reasons)[number]['id'];
