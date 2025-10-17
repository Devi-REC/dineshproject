// Tamil Nadu Residential (LT) Slab Tariff Rates
const TN_SLAB_RATES = [
  { min: 0, max: 200, rate: 4.95 },
  { min: 201, max: 250, rate: 6.65 },
  { min: 251, max: 300, rate: 8.80 },
  { min: 301, max: 400, rate: 9.95 },
  { min: 401, max: 500, rate: 11.05 },
  { min: 501, max: Infinity, rate: 12.15 },
];

export const calculateSlabCost = (totalUnits: number): number => {
  let remainingUnits = totalUnits;
  let totalCost = 0;

  for (const slab of TN_SLAB_RATES) {
    if (remainingUnits <= 0) break;

    const slabSize = slab.max === Infinity ? remainingUnits : slab.max - slab.min + 1;
    const unitsInThisSlab = Math.min(remainingUnits, slabSize);
    
    totalCost += unitsInThisSlab * slab.rate;
    remainingUnits -= unitsInThisSlab;
  }

  return totalCost;
};

export const getAverageRate = (totalUnits: number): number => {
  if (totalUnits === 0) return 0;
  return calculateSlabCost(totalUnits) / totalUnits;
};
