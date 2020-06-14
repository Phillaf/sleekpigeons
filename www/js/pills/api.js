export default class Api {

  constructor(data, limit) {
    this.data = data;
    this.limit = limit;
  }

  getPageCount() {
    return Math.round(Object.keys(this.data).length / this.limit);
  }

  getData(page) {
    const offsetStart = (page - 1) * this.limit;
    const offsetEnd = offsetStart + this.limit;
    const slice = this.data.slice(offsetStart, offsetEnd);
    return this.format(slice);
  }

  format(data) { console.log('pills base API should not be used directly') }

  getCodeWidth() {
    return 0;
  }
}
