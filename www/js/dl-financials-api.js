export async function getData() {
  const symbol = new URL(window.location.href).pathname.substring(7);
  const response = await fetch(`/api/v1/stock/metric?symbol=${symbol}`);
  let data = await response.json();

  for (const [key, value] of Object.entries(data.metric)) {
    let newkey = key
     .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
      .replace(/^./, function(str){ return str.toUpperCase(); });

    data.metric[newkey] = data.metric[key];
    delete data.metric[key];
  };

  return data.metric;
}
