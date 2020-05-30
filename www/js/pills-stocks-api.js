export async function getData() {
  const exchange = new URL(window.location.href).pathname.substring(8);
  const response = await fetch(`/api/v1/stock/symbol?exchange=${exchange}`);
  const data = await response.json();
  return data.map((stock) => ({
    code: stock.displaySymbol,
    name: stock.description,
    link: `/stock/${stock.displaySymbol}`,
    title: stock.description,
  }));
}

