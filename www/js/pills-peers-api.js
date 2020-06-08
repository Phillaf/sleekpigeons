export async function getData() {
  const symbol = new URL(window.location.href).pathname.substring(7);
  const response = await fetch(`/api/v1/stock/peers?symbol=${symbol}`);
  const data = await response.json();
  return data.map((peer) => ({
    code: "",
    name: peer,
    link: `/stock/${peer}`,
    title: peer,
  }));
}
export function getCodeWidth() {
  return 0;
}
