import Api from '/js/pills/api.js';

class PeersApi extends Api {

  format(data) {
    return data.map((peer) => ({
      code: "",
      name: peer,
      link: `/stock/${peer}`,
      title: peer,
    }));
  }

  filter(partial) {
    const filtered = this.data.filter(function(datum) {
      return datum.code.toLowerCase().includes(partial) || datum.name.toLowerCase().includes(partial);
    });

    return this.format(filtered.slice(0, this.limit));
  }
}

export async function build(limit) {
  const symbol = new URL(window.location.href).pathname.substring(7);
  const response = await fetch(`/api/v1/stock/peers?symbol=${symbol}`);
  const data = await response.json();
  return new PeersApi(data, limit);
}
