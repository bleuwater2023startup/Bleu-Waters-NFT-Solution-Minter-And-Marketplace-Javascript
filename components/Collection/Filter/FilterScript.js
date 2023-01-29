export const parseData = (nftDetails) => {
  if (!nftDetails) return [];
  const attributes = nftDetails.map(({ attributes }) => attributes);
  const parsed = {};
  attributes.forEach((d) => {
    d.forEach(({ trait_type, value }) => {
      let p = parsed[trait_type];
      if (p) {
        if (JSON.stringify(p).includes(value)) {
          parsed[trait_type] = p.map((el) =>
            value === el.type ? { type: value, count: (el.count += 1) } : el
          );
        } else {
          parsed[trait_type] = parsed[trait_type]
            ? [...parsed[trait_type], { type: value, count: 1 }]
            : [{ type: value, count: 1 }];
        }
      } else {
        parsed[trait_type] = parsed[trait_type]
          ? [...parsed[trait_type], { type: value, count: 1 }]
          : [{ type: value, count: 1 }];
      }
    });
  });
  return parsed;
};
