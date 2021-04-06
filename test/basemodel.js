const { Model, DATA_TYPES } = require('../mysql/index')

module.exports = class BaseModel extends Model {
  constructor() {
    super({
      database: 'cantinho_de_coracao',
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: ''
    });
  }
}