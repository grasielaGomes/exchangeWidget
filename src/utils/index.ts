export const formatCurrency = (
  value: string,
  country: string,
  currrency: string
) => {
  const valueClean = String(value).replace(/\D/g, "");
  const valueSplitted = Number(valueClean) / 100;
  if (value && country && currrency) {
    const formatter = valueSplitted.toLocaleString(country, {
      style: "currency",
      currency: currrency
    });
    return formatter;
  }
  return value;
};
