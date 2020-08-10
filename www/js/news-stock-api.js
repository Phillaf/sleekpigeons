export async function getData() {
  const symbol = new URL(window.location.href).pathname.substring(7);
  const to = new Date().toISOString().slice(0,10);
  let from = new Date();
  from.setDate(from.getDate() - 30);
  from = from.toISOString().slice(0,10);
  const response = await fetch(`/fin-api/v1/company-news?symbol=${symbol}&from=${from}&to=${to}`);
  return await response.json();
}

