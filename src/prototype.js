const Builder = require('./builder')

module.exports = class Prototype extends Builder {
  constructor() { super() }

  toJSON() {
    let json = {}

    for(let field in this.fields)
      if (this[field] !== undefined) json[field] = this[field]

    return json
  }

  async insertJSON({ query, json }) {
    let result = await this.ExecuteQuery({ query })

    if (!json)
      return this.getResultHeaderId(result)

    return this.setValuesInModel(result,json, this.constructor);
  }

  select(...args) {
    this.setSelect.apply(this, args)
    return this
  }

  orderBy(arg = { column: '', order: '' }) {
    this.setOrderBy(arg)
    return this
  }

  whereNotNull(arg = { column: '' }) {
    this.setWhere({ column: arg.column, comparison: 'is not', value: null })
    return this
  }

  where(arg = { column: '', comparison: '', value: '' }) {
    this.setWhere(arg)
    return this
  }

  join(arg = { table: '', tableTarget: '', tableField: '', targetField: '' }) {
    this.setJoin(arg)
    return this
  }

  async find(id) {
    let { primary } = this.getColumns();

    this.setWhere({ column: primary[0], value: id })

    let collection = await this.get()
    return collection.first()
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
    if (this.isNullOrUndefined(this.id)) return false

    this.setWhere({ column: 'id', value: this.id });
    let query = this.buildDelete(this.table)

    await this.ExecuteQuery({
      query
    })
    return true;
  }

  async save() {
    let query = this.buildUpdate();

    await this.ExecuteQuery({ query })
  }

  belongsTo(field, model) {
    try {
      return model.find(this[field]);
    } catch (error) { return undefined; }
  }

  hasMany(field, model) {
    try {
      model = new model();
      let { primary } = this.getColumns();

      for(let primary_key of primary)
        model.where({ column: field, value: this[primary_key] });

      return model.get();
    } catch (error) { return undefined }
  }
}