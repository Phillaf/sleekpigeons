export async function getData() {
  const symbol = new URL(window.location.href).pathname.substring(7);
  const to = Math.floor(new Date().getTime() / 1000);
  let from = new Date();
  from.setFullYear(from.getFullYear() - 1);
  from = Math.floor(from.getTime() / 1000);
  const response = await fetch(`/fin-api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${from}&to=${to}`);
  return await response.json();
}
