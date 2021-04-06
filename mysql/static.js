const Prototype = require('./prototype')

module.exports = class Static extends Prototype {
  constructor(config) {
    super()
    this.setCast(this.cast)
    const baseConfig = {
      host: 'localhost',
      port: 3306,
      user: "root",
      password: "",
      database: ""
    }

    config = config || {}
    this.setConfig({
      ...baseConfig,
      ...config
    })
  }

  static _fields() {
    let model = new this()
    return model.fields
  }

  static select(...args) {
    let model = new this()
    return model.select.apply(model, args)
  }

  static orderBy(arg = { column: '', order: '' }) {
    let model = new this()
    return model.orderBy(arg)
  }

  // static groupBy(field) {
  //   let model = new this()
  //   return model.groupBy(field)
  // }

  static whereNotNull(arg = { column: '' }) {
    let model = new this()
    return model.whereNotNull(arg)
  }

  static where(arg = { column: '', comparison: '', value: '' }) {
    let model = new this()
    return model.where(arg)
  }

  static async find(id) {
    let model = new this()
    return model.find(id)
  }

  static get() {
    let model = new this()
    return model.get()    
  }

  static async insertGetId(json = {}) {
    // let model = new this()

    // json = model.builder.usingCast(model.cast, json)
    // let query = model.builder.buildInsert(json, model.fields, model.table)
    // return model.connector.ExecuteNonQuery({
    //   query
    // })
  }
  
  static async create(json = {}) {
    let model = new this()
    
    // json = model.builder.usingCast(model.cast, json)
    // let query = model.builder.buildInsertModel(model, json)
    // let id = await model.connector.ExecuteNonQuery({ query })

    // return (model.id = id) && (model)
  }
}