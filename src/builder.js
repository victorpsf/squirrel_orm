const Connector = require('./connector')

module.exports = class Builder extends Connector {
  selectFields = []
  whereFields  = []
  whereGroupBy = ""
  whereOrderBy = ""
  joinFields   = []
  insertFields = []
  insertValues = []
  updateFields = []
  builderCast  = {}

  constructor() { super() }

  setCast(cast) {
    if (!this.isObject(cast)) throw new Error('Builder setCast: cast is not object')
    this.builderCast = cast
  }

  usingCast(key, value) {
    switch (this.builderCast[key]) {
      case 'array':
      case 'json': 
        value = JSON.stringify(value)
        break
      default:
        break
    }

    return value
  }

  /**
   * @param {*} value 
   * 
   * retorna valor formatado para padrão do mysql
   * 
   * @returns 
   */
  getMysqlValue(value) {
    return this.mysql.escape(value || null)
  }

  /**
   * @param {*} arg 
   * 
   * retorna field formatado para uso no mysql
   * 
   * @returns 
   */
  mapSplitField(arg = '') {
    return '`' + arg + '`'    
  }

  /**
   * @param {*} value 
   * @param {*} index 
   * @param {*} array 
   * 
   * retorno da query
   * 
   * @returns 
   */
  mapSetSelect(value, index, array) {
    if (this.isString(value)) {
      return value.split('.').map((...args) => this.mapSplitAsValue.apply(this, args)).join('.')
    } else if (this.isArray(value)) {
      return this.mapSplitSelectArray(value, index, array).join(' as ')
    } else {
      return
    }
  }

  /**
   * @param {*} value 
   * @param {*} index 
   * @param {*} array 
   * 
   * 
   * @returns 
   */
  mapSplitAsValue(value, index, array) {
    if (value == '*') return value

    return this.mapSplitField(value)
  }

  /**
   * @param {*} arg 
   * 
   * retorna select formatado para filtro
   * 
   * @returns 
   */
  mapSplitSelectArray(arg) {
    let first  = arg[0]
    let second = arg[1]

    first  = first.split('.').map(this.mapSplitField).join('.')
    second = second.split('.').map((...args) => this.mapSplitAsValue.apply(this, args)).join('.')
    return [first, second]
  }

  /**
   * @param {*} value 
   * 
   * retorna valores formatados para uso do mysql
   * 
   * @returns 
   */
  mapInsertValue(value = '') {
    return `( ${value} )`
  }

  /**
   * @param {*} query 
   * @param {*} index 
   * @param {*} array 
   * 
   * @returns
   */
  mapUpdateComplement(query, index, array) {
    switch (index) {
      case 0:
        return query
      case 1:
        return ` WHERE ${query}`
      default:
        return query
    }
  }

  /**
   * @param {*} value 
   * @param {*} index 
   * @param {*} array 
   * 
   * adiciona filtro
   */
  mapSelectComplement(value, index, array) {
    switch (index) {
      case 0:
        return `WHERE ${value}`
      default:
        return value
    }
  }

  /**
   * @param {*} value 
   * @param {*} index 
   * @param {*} array 
   * 
   */
  mapJoinQuery(value, index, array) {
    for(let key in value) value[key] = this.mapSplitField(value[key])

    const { table, tableTarget, tableField, targetField } = value
    let _table_  = [table, tableField].join('.')
    let _target_ = [tableTarget, targetField].join('.')

    return `INNER JOIN ${tableTarget} ON ${_target_} = ${_table_}`;
  }

  /**
   * @param {*} value 
   * 
   * remove caso esteja vazio
   */
  filterSelect(value) {
    return !!value
  }

  /**
   * limpa o selectFields
   */
  unsetSelect() {
    this.selectFields = []
  }

  /**
   * @param {*} args 
   * 
   * adiciona valores ao selectFields
   * 
   * @returns 
   */
  setSelect(...args) {
    if (this.emptyArray(args)) return

    this.selectFields = this.selectFields.concat(args)
    return this
  }

  /**
   * retorna campos para seleção
   * 
   * @returns String
   */
  getSelect() {
    let selectValues = this.selectFields.map((value, index, array) => this.mapSetSelect(value, index, array)).filter(this.filterSelect)

    this.unsetSelect()
    selectValues = (selectValues.join(', ')) || '*'
    return ` ${selectValues} `
  }

  /**
   * limpa whereFields
   */
  unsetWhere() { 
    this.whereFields = []
  }

  /**
   * @param {*} arg 
   * 
   * adiciona novo filtro para busca
   */
  setWhere(arg = { column: '', comparison: '', value: '' }) { 
    if (this.isUndefined(arg.comparison)) arg.comparison = '='
    this.whereFields.push(arg)
    return this
  }

  /**
   * valores para filtro de busca
   * 
   * @returns String
   */
  getWhere() { 
    let whereQuery = []

    for(let where of this.whereFields) {
      let { column, comparison, value } = where

      column = column.split('.').map(this.mapSplitField).join('.')
      value  = this.getMysqlValue(value)

      whereQuery.push(`${column} ${comparison} ${value}`)
    }

    this.unsetWhere()
    whereQuery = whereQuery.join(' AND ')
    return whereQuery ? '(' + whereQuery + ')': null
  }

  /**
   * limpa orderBy
   */
  unsetOrderBy() {
    this.whereOrderBy = ''
  }

  /**
   * @param {*} arg
   * 
   * adiciona ordenação dos valores
   */
  setOrderBy(arg = { column: '', order: '' }) {
    let { column, order } = arg

    column = column.split('.').map(this.mapSplitField).join('.')
    this.whereOrderBy = `ORDER BY ${column} ${order}`
    return this
  }

  /**
   * retorna ordenação para valores
   * 
   * @returns String
   */
  getOrderBy() {
    let orderby = this.whereOrderBy.substr(0)    
    this.unsetOrderBy()
    return orderby ? ` ${orderby} ` : null
  }

  /**
   * limpa insertFields
   */
  unsetInsertFields() {
    this.insertFields = []
  }

  /**
   * @param {*} args 
   * 
   * adiciona colunas de inserção
   */
  setInsertFields(args = []) {
    if (this.isObject(args)) {
      this.insertFields = Object.keys(args)
    }
    else if (this.isArray(args)) {
      let keys = []

      for(let value of args) {
        if (!this.isObject(value)) continue

        try {
          let value_keys = Object.keys(value)

          for(let key of value_keys) if (!this.in_array(keys, key)) keys.push(key)
        } catch (error) { console.error(error) }
      }

      this.insertFields = keys
    }
    return this
  }

  /**
   * retorna colunas de inserção
   * 
   * @returns String
   */
  getInsertFields() {
    let insertFields = this.insertFields.map((field) => {
      return field.split('.')
                  .map(this.mapSplitField)
                  .join('.')
    }).join(', ')

    this.unsetInsertFields()
    return `( ${insertFields} )`
  }

  /**
   * limpa campo de valores de inserção
   */
  unsetInsertValues() {
    this.insertValues = []
  }

  /**
   * @param {*} args 
   * 
   * adiciona valores de inserção
   */
  setInsertValues(args = []) {
    if (this.isObject(args)) {
      let value = []

      for(let key of this.insertFields) {
        let _value_ = this.usingCast(key, args[key])
        value.push(this.getMysqlValue(_value_))
      }

      this.insertValues = [value.join(', ')]
      return this
    }
    if (this.isArray(args)) {
      let values = []
  
      for(let value of args) {
        let valueArray = []
  
        if (!this.isObject(value)) continue
        for(let key of this.insertFields) {
          let _value_ = this.usingCast(key, value[key])
          valueArray.push(this.getMysqlValue(_value_))          
        }

        values.push(valueArray.join(', '))
      }

      this.insertValues = values
      return this
    }
  }

  /**
   * obtem valores de inserção
   * 
   * @returns String
   */
  getInsertValues() {
    let insertValues = this.insertValues
    this.unsetInsertValues()
    return insertValues.map(this.mapInsertValue).join(', ')
  }

  /**
   * limpa campos de atualização updateFields
   */
  unsetUpdate() {
    this.updateFields = []
  }

  /**
   * @param {column,value} arg 
   * 
   * adiciona campo para atualização
   */
  setUpdate(arg = []) {
    for(let column of arg) {
      let value = this[column]
      value = this.usingCast(column, value)
      value = this.getMysqlValue(value)
      column = column.split('.').map(this.mapSplitField).join('.')

      this.updateFields.push(`${column} = ${value}`)
    }
    return this
  }

  /**
   * retorna campos para tualização
   * 
   * @returns string
   */
  getUpdate() {
    let query = this.updateFields.join(', ')
    this.unsetUpdate()
    return query
  }

  /**
   * @param {*} arg 
   * 
   * adiciona where nos campos de tipo primario
   */
  setUpdateWhere(arg = []) {
    for(let column of arg) {
      let value = this[column]

      if (this.isNullOrUndefined(value)) throw new Error(`Builder buildUpdate setUpdateWhere: primary column ${column} don't contain value`)
      this.setWhere({ column, value })
    }
    return this
  }

  /**
   * limpa campos de join
   */
  unsetJoin() {
    this.joinFields = [];
  }

  /**
   * @param {table,tableTarget,tableField,targetField} arg 
   * 
   * adiciona filtro join
   */
  setJoin(arg = { table: '', tableTarget: '', tableField: '', targetField: '' }) {
    for(let key in arg) if (this.isArray(arg[key])) throw new Error(`Builder setJoin: value in ${key} is array, if you want to add a filter add them to function select`)
    this.joinFields.push(arg)
    return this
  }

  /**
   * obtem join com tabelas
   * 
   * @returns string
   */
  getJoin() {
    let joinFields = this.joinFields.map((...args) => this.mapJoinQuery.apply(this, args)).join(' ');

    this.unsetJoin()
    return joinFields
  }

  /**
   * retorna colunas da tabela
   * 
   * @returns {primary,other}
   */
  getColumns() {
    let primary = []
    let other   = []

    for(let key in this.fields) {
      let config = this.fields[key]

      if (config.primaryKey) primary.push(key)
      else                   other.push(key)
    }

    return {
      primary,
      other
    }
  }

  /**
   * @param {*} value 
   * 
   * obtem query de insert
   * 
   * @returns 
   */
  buildInsert(value) {
    let table = this.table.split('.').map(this.mapSplitField).join('.')

    this.setInsertFields(value)
    this.setInsertValues(value)    

    return `INSERT INTO ${table} ${this.getInsertFields()} VALUES ${this.getInsertValues()}`
  }

  /**
   * obtem query de select
   * 
   * @returns String
   */
  buildSelect() {
    let table = this.table.split('.').map(this.mapSplitField).join('.')
    
    let complements = {
      where: this.getWhere(),
      order: this.getOrderBy(),
      join: this.getJoin()
    }
    let complement = []

    if (complements.join)  complement.push(complements.join)
    if (complements.where) complement.push(`WHERE ${complements.where}`)
    if (complements.order) complement.push(complements.order)

    return `SELECT ${this.getSelect()} from ${table} ${complement.join(' ')};`
  }

  /**
   * obtem query de delete com filtro para não remover todos os dados
   * 
   * @returns String
   */
  buildDelete() {
    let table = this.table.split('.').map(this.mapSplitField).join('.')
    let complement = [
      this.getWhere()
    ].filter(this.filterSelect).map(this.mapSelectComplement).join('')

    if (!complement.length) throw new Error('Builder buildDelete: query is not contain where clousure')

    return `DELETE FROM ${table} ${complement};`
  }

  /**
   * @returns String
   */
  buildUpdate() {
    let table = this.table.split('.').map(this.mapSplitField).join('.')
    let { primary, other } = this.getColumns()

    if (this.emptyArray(primary)) throw new Error('Builder buildUpdate: primary key is not defined in fields')
    this.setUpdate(other)
    this.setUpdateWhere(primary)

    let complement = [
      this.getUpdate(),
      this.getWhere()
    ].map(this.mapUpdateComplement).join(' ')


    return `UPDATE ${table} ${complement};`
  }

  /**
   * @param {*} param0 
   * 
   * retorna id do ExecuteQuery
   * 
   * @returns Number
   */
  getResultHeaderId({ insertId = null }) {
    return insertId
  }

  /**
   * @param {model, json} param0 
   *
   * adiciona valores no model
   * 
   * @returns model
   */
  setJSONPropertiesModel({ model, json }) {
    for(let field in model.fields) {
      model.setProperties(field, json[field] || null)
    }
    
    return model
  }

  /**
   * @param {*} results 
   * @param {*} json 
   * @param {*} model 
   * 
   * inicializa novo model apartir do retorno do ExecuteQuery
   * 
   * @returns model
   */
  setValuesInModel(results, json, model) {
    return this.setJSONPropertiesModel({
      model: new model(),
      json: {
        ...json,
        id: this.getResultHeaderId(results)
      }
    })
  }
}