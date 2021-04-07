class Util {
  module = require('util')

  constructor() {}

  static in_array(array = [], value) {
    return (array.indexOf(value) >= 0)
  }

  in_array(array = [], value) {
    return (array.indexOf(value) >= 0)
  }

  emptyArray(array) {
    return !array.length
  }

  static getClassMethods(classInstance) {
    return (new this()).getClassMethods(classInstance)
  }

  getClassMethods(classInstance) {
    let props = []
    let copyClass = classInstance

    // pegando os prototypes da classe
    do {
      props = props.concat(Object.getOwnPropertyNames(copyClass))
    } while(copyClass = Object.getPrototypeOf(copyClass))

    // removendo prototypes repetidos
    props.sort().filter(function (element, index, array) {
      return (array.indexOf(element) == index)
    })

    /**
     * if error is not instance of class
     * if not exists error is instance of class
     */
    try {
      props = props.filter((element, index, array) => {
        return typeof classInstance[element] == 'function'
      })
    } catch (error) { }

    return props
  }

  getNumber(value) {
    let numbers = '1234567890'
    let isfloat = false
    let string = ''

    for(let x = 0; x < value.length; x++) {
      let char = value[x]
      let bool = char == ',' || char == '.'

      if (isfloat && bool) {
        continue
      }
      else if (!isfloat && bool) {
        isfloat = true
        char = '.'
      }
      else if (!numbers.search(char)) {
        continue
      }

      string += char
    }

    return (isfloat) ? parseFloat(string) : parseInt(string)
  }

  isUndefined(value) {
    return (typeof value === 'undefined')
  }

  isNull(value) {
    return (value === null)
  }

  isNullOrUndefined(value) {
    return (this.isNull(value) || this.isUndefined(value))
  }

  isString(value) {
    if (this.isNullOrUndefined(value)) return false
    return typeof value === 'string'
  }

  isDateTime(value) {
    if (this.isNullOrUndefined(value))     return false
    if (value.constructor.name === 'Date') return true
    let isString = this.isString(value)

    if (!isString) return false
    return /^\d+\-\d+\-\d+T\d+\:\d+\:\d+\.\d+Z$/.test(value)
  }

  isDate(value) {
    if (this.isNullOrUndefined(value))     return false
    if (value.constructor.name === 'Date') return true
    let isString = this.isString(value)

    if (!isString) return false
    return /^\d+\-\d+\-\d+$/.test(value)
  }

  isTime(value) {
    if (this.isNullOrUndefined(value))     return false
    if (value.constructor.name === 'Date') return true
    let isString = this.isString(value)

    if (!isString) return false
    return /^\d+\:\d+\:\d+$/.test(value)
  }

  isBoolean(value) {
    if (this.isNullOrUndefined(value))        return false
    if (value.constructor.name === 'Boolean') return true
    let isString = this.isString(value)

    return /^true$/.test(value) || /^false$/.test(value)
  }

  isNumber(value) {
    if (this.isNullOrUndefined(value))       return false
    if (value.constructor.name === 'Number') return true
    let isString = this.isString(value)

    if (!isString) return false
    return /^((\d+)|(\d+\.\d+))$/.test(value)
  }

  isObject(value) {
    if (this.isNullOrUndefined(value)) return false
    if (typeof value === 'object' && value.constructor.name !== 'Array') return true
    let isString = this.isString(value)

    if (!isString) return false
    return /^\{.+\}$/.test(value)
  }

  isArray(value) {
    if (this.isNullOrUndefined(value)) return false
    if (typeof value === 'object' && value.constructor.name === 'Array') return true
    let isString = this.isString(value)

    if (!isString) return false
    return /^\[.+\]$/.test(value)
  }

  isEmail(value) {
    if (this.isNullOrUndefined(value)) return false
    if (!this.isString(value)) return false
    return /^.+@\w+\.\w{3}$|^.+@\w+\.\w{3}\.\w{2}$/.test(value)
  }
}

module.exports = Util