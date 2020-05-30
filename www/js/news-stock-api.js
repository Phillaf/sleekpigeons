export async function getData() {
  const to = new Date().toISOString().slice(0,10);
  let from = new Date();
  from.setDate(from.getDate() - 30);
  from = from.toISOString().slice(0,10);
  const response = await fetch(`/api/v1/company-news?symbol=ADTN&from=${from}&to=${to}`);
  return await response.json();
}

