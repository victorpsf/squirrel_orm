const DATA_TYPES = require('./datatypes')
const Util = require('./util')

module.exports = class Properties extends Util {
  mysql = require('mysql2')
  collection = require('./collection')
  configs = { }
  
  static DataTypes = DATA_TYPES
  DataTypes = DATA_TYPES
  
  table = ""
  fields = {}
  relation = {}
  cast = {}
  
  constructor() { super() }

  // set cofiguration
  setConfig(config) {
    this.configs = config
  }

  // return configuration
  getConfig() {
    return this.configs
  }

  setProperties(key, value) {
    this[key] = value
  }
}