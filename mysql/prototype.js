const Builder = require('./builder')

module.exports = class Prototype extends Builder {
  constructor() { super() }

  toJSON() {
    let json = {}

    for(let field of this.fields)
      if (this[field] !== undefined) json[field] = this[field]

    return json
  }

  select(...args) {
    this.setSelect.apply(this, args)
    return this
  }

  orderBy(arg = { column: '', order: '' }) {
    this.setOrderBy(arg)
    return this
  }

  // groupBy(field) {
  //   this.builder.group(field)
  //   return this
  // }

  whereNotNull(arg = { column: '' }) {
    this.setWhere({ column: arg.column, comparison: 'is not', value: null })
    return this
  }

  where(arg = { column: '', comparison: '', value: '' }) {
    this.setWhere(arg)
    return this
  }

  async find(id) {
    this.setWhere({ column: 'id', value: id })

    let MySqlReader = await this.get()
    return MySqlReader.first()
  }

  get() {
    let query = this.buildSelect()

    return this.ExecuteReader({
      query,
      model: this,
      cast: this.cast
    })
  }

  async delete() {
    if (!this.id) return false

    this.where({ column: 'id', value: this.id })
    // let query = this.builder.buildDelete(this.table)

    // await this.connector.ExecuteNonQueryDeleteOrUpdate({
    //   query
    // })
    return true
  }

  async save() {
    this.builder.usingCast(this.cast, this)
    // let query = this.builder.buildUpdateModel(this)

    // await this.connector.ExecuteNonQueryDeleteOrUpdate({
    //   query
    // })
  }

  async belongsTo(field, model) {
    // try {
    //   return await model.find(this[field])
    // } catch (error) { return undefined }
  }

  async hasMany(field, model) {

  }
}