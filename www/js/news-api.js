export async function getData() {
  const response = await fetch(`/api/v1/news`);
  return await response.json();
}
