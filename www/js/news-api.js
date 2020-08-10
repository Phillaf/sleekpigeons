export async function getData() {
  const response = await fetch(`/fin-api/v1/news`);
  return await response.json();
}
