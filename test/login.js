const BaseModel = require('./basemodel')

module.exports = class Login extends BaseModel {
  table = 'login'

  fields = {
    id: {
      type: this.DataTypes.INTERGER,
      auto_increment: true,
      nullable: false,
      primaryKey: true
    },
    acesso: {
      type: this.DataTypes.STRING,
      nullable: false
    },
    senha: {
      type: this.DataTypes.STRING,
      nullable: false
    }
  }

  constructor() { super() }
}