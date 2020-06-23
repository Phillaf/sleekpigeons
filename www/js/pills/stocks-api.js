import Api from '/js/pills/api.js';

class StocksApi extends Api {

  format(data) {
    return data.map((stock) => ({
      code: stock.displaySymbol,
      name: stock.description,
      link: `/stock/${stock.displaySymbol}`,
      title: stock.description,
    }));
  }

  filter(partial) {
    const filtered = this.data.filter(function(datum) {
      return datum.displaySymbol.toLowerCase().includes(partial) || datum.description.toLowerCase().includes(partial);
    });

    return this.format(filtered.slice(0, this.limit));
  }

  getCodeWidth() {
    return 5;
  }
}

export async function build(limit) {
  const exchange = new URL(window.location.href).pathname.substring(8);
  const response = await fetch(`/api/v1/stock/symbol?exchange=${exchange}`);
  const data = await response.json();
  return new StocksApi(data, limit);
}
