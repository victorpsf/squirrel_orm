const Static = require('./static')

module.exports = class Model extends Static {
  constructor(config) { super(config); }

  static instance() { return new this(); }
}