const buildQueryParams = (filters) => {
  const params = new URLSearchParams();
  const filterKeys = ['departureTime', 'arrivalTime', 'busType', 'amenities'];

  for (const key of filterKeys) {
    if (Array.isArray(filters[key]) && filters[key].length > 0) {
      params.append(key, filters[key].join(','));
    }
  }

  return params.toString();
};

export default buildQueryParams;
