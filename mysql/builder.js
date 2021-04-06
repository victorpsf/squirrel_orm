const Connector = require('./connector')

module.exports = class Builder extends Connector {
  selectFields = []
  whereFields = []
  whereGroupBy = ""
  whereOrderBy = ""
  insertFields = []
  insertValues = []
  builderCast = {}

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
   * @param {*} arg 
   * 
   * retorna select formatado para filtro
   * 
   * @returns 
   */
  mapSplitSelectArray(arg = ['', '']) {
    let first  = arg[0] 
    let second = arg[1]

    first = first.split('.').map(this.mapSplitField).join('.')
    second = this.mapSplitField(second)

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
   * @param {*} value 
   * 
   * remove caso esteja vazio
   */
  filterSelect(value) {
    return !!value
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
   * @param {*} args 
   * 
   * adiciona valores ao selectFields
   * 
   * @returns 
   */
  setSelect(...args) {
    if (this.emptyArray(args)) return

    this.selectFields = this.selectFields.concat(args)
  }

  /**
   * limpa o selectFields
   */
  unsetSelect() {
    this.selectFields = []
  }

  /**
   * retorna campos para seleção
   * 
   * @returns String
   */
  getSelect() {
    let selectValues = []

    for(let select of this.selectFields) {
      if (this.isString(select)) {
        selectValues.push(
          select.split('.').map(this.mapSplitField).join('.')
        )
        continue
      }
      if (this.isArray(select)) {
        selectValues.push(
          this.mapSplitSelectArray(select).join(' as ')
        )
        continue
      }
    }

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
    return whereQuery ? '(' + whereQuery + ')': whereQuery
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
  }

  /**
   * retorna ordenação para valores
   * 
   * @returns String
   */
  getOrderBy() {
    let orderby = this.whereOrderBy.substr(0)    
    this.unsetOrderBy()
    return orderby ? ` ${orderby} ` : orderby
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
      for(let key in this.insertFields) {
        let _value_ = this.usingCast(key, args[key])
        value.push(this.getMysqlValue(_value_))
      }

      this.insertValues = [value.join(', ')]
      return
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
      return
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
    let complement = [
      this.getWhere(),
      this.getOrderBy()
    ].filter(this.filterSelect).map(this.mapSelectComplement).join(' ')

    return `SELECT ${this.getSelect()} from ${table} ${complement};`
  }

  
}