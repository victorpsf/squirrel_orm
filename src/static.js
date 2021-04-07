const Prototype = require('./prototype')

module.exports = class Static extends Prototype {
  constructor(config) {
    super();
    this.setCast(this.cast);
    const baseConfig = {
      host: 'localhost',
      port: 3306,
      user: "root",
      password: "",
      database: ""
    };

    config = config || {};
    this.setConfig({
      ...baseConfig,
      ...config
    });
  }

  static _fields() {
    let model = new this();
    return model.fields;
  }

  static select(...args) {
    let model = new this();
    return model.select.apply(model, args);
  }

  static orderBy(arg = { column: '', order: '' }) {
    let model = new this();
    return model.orderBy(arg);
  }

  static whereNotNull(arg = { column: '' }) {
    let model = new this();
    return model.whereNotNull(arg);
  }

  static where(arg = { column: '', comparison: '', value: '' }) {
    let model = new this();
    return model.where(arg);
  }

  static join(arg = { table: '', tableTarget: '', tableField: '', targetField: '' }) {
    let model = new this();
    return model.join(arg);
  }

  static async find(id) {
    let model = new this();
    return model.find(id);
  }

  static get() {
    let model = new this();
    return model.get();
  }

  static async insertGetId(json = {}) {
    let model = new this();
    
    if (!model.isObject(json)) throw new Error('Squirrel-ORM static save: argument is not json type.');
    let query = model.buildInsert(json);
    let result= await model.ExecuteQuery({ query });

    return model.getResultHeaderId(result);
  }

  static async create(arg) {
    let model = new this();
    let result = null;
    let query = null;
    
    if (model.isArray(arg)) {
      let arrayVerify = {
        bool: false,
        index: []
      };

      for(let index in arg) {
        if (!model.isObject(arg[index])) {
          arrayVerify.bool = true;
          arrayVerify.index.push(index);
        }
        continue
      }

      if (arrayVerify.bool) throw new Error(`Squirrel-ORM static save: values in array is not json type.\nIndex: [${arrayVerify.index.join(',')}]`);

      let values = [];
      
      for(let row of arg) {
        values.push(this.create(row));
      }

      values = await Promise.all(values);
      return model.collection.instance(values);
    }
    else if (model.isObject(arg)) {
      query = model.buildInsert(arg);
      result = await model.ExecuteQuery({ query });
      return model.setValuesInModel(result, arg, this);
    }
  }
}