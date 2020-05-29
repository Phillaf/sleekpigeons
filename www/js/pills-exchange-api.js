export async function getData() {
  const response = await fetch('/api/v1/stock/exchange');
  const data = await response.json();
  return data.map((exchange) => ({
    code: exchange.code,
    name: exchange.name.toLowerCase(),
    link: `/stocks/${exchange.code}`,
    title: exchange.name.toLowerCase(),
  }));
}
