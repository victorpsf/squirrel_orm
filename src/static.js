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

    return await model.insertJSON({ query: model.buildInsert(json) });
  }

  static async create(arg) {
    let model = new this();
    
    if (model.isArray(arg)) {
      let promises = []

      for(let row of arg) 
        if (model.isObject(row)) promises.push(
          model.insertJSON({ query: model.buildInsert(row) , json: row })
        )

      let values = await Promise.all(promises);
      return model.collection.instance(values)
    }
    else if (model.isObject(arg)) {
      return model.insertJSON({ query: model.buildInsert(arg), json: arg });
    }
  }
}