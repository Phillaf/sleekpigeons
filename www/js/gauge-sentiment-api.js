export async function getData() {
  const symbol = new URL(window.location.href).pathname.substring(7);
  const response = await fetch(`/fin-api/v1/news-sentiment?symbol=${symbol}`);
  const data = await response.json();
  if (data.sentiment === null) return;
  return {
    gauge: data.sectorAverageBullishPercent,
    gaugeTitle: "Sector Sentiment",
    arrow: data.sentiment.bullishPercent,
    arrowTitle: `${symbol} sentiment`,
  };
}
