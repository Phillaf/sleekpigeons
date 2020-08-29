import Api from '/js/pills/api.js';

class ExchangeApi extends Api {

  format(data) {
    return data.map((exchange) => ({
      code: exchange.name,
      name: exchange.code.toLowerCase(),
      link: `/stocks/${exchange.name}`,
      title: exchange.code.toLowerCase(),
    }));
  }

  filter(partial) {
    const filtered = this.data.filter(function(datum) {
      return datum.code.toLowerCase().includes(partial) || datum.name.toLowerCase().includes(partial);
    });

    return this.format(filtered.slice(0, this.limit));
  }

  getCodeWidth() {
    return 3;
  }
}

export async function build(limit) {
  const response = await fetch(`/data/exchanges.json`);
  const data = await response.json();
  return new ExchangeApi(data, limit);
}
