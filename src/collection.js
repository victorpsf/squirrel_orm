const mysql = require('mysql2');
const RegExpUtil = require('./regexp');

const orderBy = ['asc', 'desc'];
const comparisons = ["=", "<", ">", "<=", ">=", "!="];

/**
 * @param {any} value 
 * 
 * converte para json
 * @returns object
 */
const toJSON = function (value) {
  let json = {};

  if (typeof value != 'object' || value.constructor.name == 'Array')
    return value;

  for(let key in value) {
    if (typeof value[key] == "function" || typeof value[key] == "symbol" || typeof value[key] == "undefined") continue;
    json[key] = value[key];
  }

  return json;
}

/**
 * @param {string} type 
 * 
 * verifica se typo informado é valido
 * 
 * @returns boolean
 */
const validateOrderOption = function (type) {
  return orderBy.indexOf(type) >= 0;
}

/**
 * @param {string} comparison 
 * 
 * verifica se valor de comparação é valido
 */
const validateComparison = function (comparison) {
  if (comparisons.indexOf(comparison) < 0) throw "Invalid Comparison";
}

/**
 * @param {string} value 
 * 
 * verifica se exite delimitadores para conversão regexp
 * 
 * @returns boolean 
 */
const validateRegexp = function (value) {
  return /^\%.+\%$/.test(value);
}

/**
 * @param {string} value 
 * 
 * cria regexp com string passada
 * 
 * @returns RegExp
 */
const createRegExp = function (value = '') {
  if (value.substr(0, 1) == '%') value = value.slice(1);
  let len = value.length;
  if (value.substr(len - 1) == '%') value = value.slice(0, len - 1);

  let regExpString = RegExpUtil.StringRegExp(value);
  return new RegExp(regExpString, 'g');
}

/**
 * @param {string} comparison 
 * 
 * obtem comparador
 * 
 * @returns string
 */
const convertComparison = function (comparison) {
  switch (comparison) {
    case '=':
      return '==';
    default:
      return comparison;
  }
}

module.exports = class Collection {
  original = [];

  /**
   * @param {*} data  is array data
   * @param {*} model is constructor class
   */
  constructor(data, model) {
    this.$build(data, model);
  }

  /**
   * @param {*} data 
   * @param {*} model 
   * 
   * construir Collection
   */
  $build(data, model) {
    for(let row of data) {
      if (!model) {
        this.original.push(row)
        continue;
      }

      let _model_ = new model();
      for(let column in _model_.fields) {
        _model_[column] = row[column]
      }

      this.original.push(_model_)
    }
  }

  /**
   * retorna todos os valores
   * 
   * @returns 
   */
  all() {
    return this.original.slice();
  }

  /**
   * transforma em array
   * 
   * @returns 
   */
  toArray() {
    let data = [];

    for(let row of this.original.slice()) {
      if (typeof row.toJSON !== 'function')
        data.push(toJSON(row));
      else
        data.push(row.toJSON());
    }

    return data;
  }

  /**
   * 
   * @param {column,comparison,value} args 
   * 
   * filtra valores
   * 
   * @returns Collection
   */
  where(args = { column: '', comparison: '', value: '' }) {
    let data = [];
    if (typeof args.comparison == "undefined") args.comparison = '=';
    validateComparison(args.comparison);
    args.comparison = convertComparison(args.comparison);

    for(let row of this.original) {
      if (typeof row[args.column] == 'undefined') continue;

      if (typeof args.value == 'string' && validateRegexp(args.value)) {
        if (!createRegExp(args.value).test(mysql.escape(row[args.column]))) continue;
        data.push(row);          
      } else {
        if (!eval(`${mysql.escape(row[args.column])} ${args.comparison} ${mysql.escape(args.value)}`)) continue;
        data.push(row);
      }
    }

    return new Collection(data);
  }

  /**
   * @param {*} funct 
   * 
   * usar para filtrar campos
   * 
   * @returns Collection
   */
  map(funct) {
    let data = this.original.map(funct);
    return new Collection(data);
  }

  /**
   * @param {*} funct 
   * 
   * use para filtrar os dados
   * 
   * @returns Collection
   */
  filter(funct) {
    let data = this.original.filter(funct);
    return new Collection(data);
  }
  
  /**
   * @param {*} column 
   * @param {'asc','desc'} type 
   * 
   * uso para ordenar os campos
   * 
   * @returns Collection 
   */
  orderBy(column, type) {
    if (!validateOrderOption(type)) throw `Collection OrderBy: unsuported '${type}'`;

    let data = this.original.sort(function (x, y) {
      if (x[column] > y[column]) {
        if (type == 'asc') { return 1; }
        else               { return -1; }
      }
      if (x[column] < y[column]) {
        if (type == 'asc') { return -1; }
        else               { return 1; }
      }

      return 0;
    });

    return new Collection(data);
  }

  /**
   * retorna primeiro valor
   * 
   * @returns 
   */
  first() {
    return this.original[0];
  }

  /**
   * retorna ultimo valor
   * 
   * @returns 
   */
  last() {
    let len = this.original.length;
    return this.original[len - 1 < 0 ? 0: len - 1];
  }

  static instance(data, model) {
    return new Collection(data, model)
  }
}