export async function getData() {
  const symbol = new URL(window.location.href).pathname.substring(7);
  const response = await fetch(`/api/v1/news-sentiment?symbol=${symbol}`);
  const data = await response.json();
  return {
    gauge: data.sectorAverageBullishPercent,
    gaugeTitle: "Sector Sentiment",
    arrow: data.sentiment.bullishPercent,
    arrowTitle: `${symbol} sentiment`,
  };
}
