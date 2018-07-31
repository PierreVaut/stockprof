export const balance = (prices, position) => {
  if (!prices || !position) {
    return 0;
  }
  let profit = 0;
  for (const el in position) {
    if (position.hasOwnProperty(el)) {
      if (prices) {
        prices.forEach(price => {
          if (price.symbol1 === el) {
            profit += Math.round(position[el] * price.price);
          }
        });
      }
    }
  }

  return profit;
};
