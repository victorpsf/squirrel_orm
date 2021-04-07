# Squirrel_orm é um simples ORM feito com orientação a objeto

Aqui vou abordar as informações para utilização da biblioteca.

## Conteudo

- [Primeiro passo é a instalação](#primeiro-passo-é-a-instalação)
- [Definição do BaseModel](#definição-do-BaseModel)
- [Definição do model](#definição-do-model)
- [Definição da tabela](#definição-da-tabela)
- [Definição dos fields](#definição-dos-fields)
- [definição da relation](#definição-da-relation)

### Primeiro passo é a instalação

``` bash 
$ npm install --save mysql2 squirrel_orm
```
obs: a biblioteca usa o <a href="https://www.npmjs.com/package/mysql2">mysql2</a> é uma dependência de utilização

### Definição do BaseModel

O base model é importante para que você não precise ficar adicinando a configuração de conexão em todos os modelos que você vier a criar.

``` js
const { Model } = require('squirrel_orm');

module.exports = class BaseModel extends Model {
  constructor() { 
    // tem suporte as configurações do mysql2
    // pois as opções passadas aqui são utilizadas para criação
    // da conexão
    super({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'teste'
    })
  }
}
```

### Definição do model

A definição do model é bastante simples, segue uma pequena lógica.

- table    - tabela a qual vai ser acessado
- fields   - definição dos campos(colunas) da tabela
- relation - você deve colocar o nome da classe a qual se faz referência e o mode dela
- cast     - conversão de tipos, por exemplo: array ou json

#### Definição da tabela
``` js
const BaseModel = require('./BaseModel');

module.exports = class User extends BaseModel {
  table = 'user';

  constructor() { super() }
}
```

#### Definição dos fields

``` js
// exemplo
const BaseModel = require('./BaseModel');

module.exports = class User extends BaseModel {
  table = 'user';
  fields = {
    "id": {
      type: this.DataTypes.INTERGER,
      auto_increment: true,
      nullable: true,
      primary_key: true
    },
    "acesso": {
      type: this.DataTypes.STRING,
      nullable: false
    },
    "chave": {
      type: this.DataTypes.STRING,
      nullable: false
    }
  };

  constructor() { super() }
}
```

``` js
// exemplo
const BaseModel = require('./BaseModel');

module.exports = class Pessoa extends BaseModel {
  table = 'pessoa';
  fields = {
    "id": {
      type: this.DataTypes.INTERGER,
      auto_increment: true,
      nullable: true,
      primary_key: true
    },
    "nome": {
      type: this.DataTypes.STRING,
      nullable: false
    },
    "email": {
      type: this.DataTypes.STRING,
      nullable: false
    },
    "user_id": {
      type: this.DataTypes.INTERGER,
      nullable: false,
      foreign_key: true
    }
  };

  constructor() { super() }
}
```

### definição da relation
``` js
// exemplo
const BaseModel = require('./BaseModel');

module.exports = class User extends BaseModel {
  table = 'user';
  fields = {
    "id": {
      type: this.DataTypes.INTERGER,
      auto_increment: true,
      nullable: true,
      primary_key: true
    },
    "acesso": {
      type: this.DataTypes.STRING,
      nullable: false
    },
    "chave": {
      type: this.DataTypes.STRING,
      nullable: false
    }
  };

  relation: {
    pessoa: require('./Pessoa.js')
  }

  constructor() { super() }

  // retorna promise<Collection>
  // exemplo de relação onde user é referênciado em pessoa
  pessoa() {
    return this.hasMany('user_id', this.relation.pessoa);
  }
}
```

``` js
// exemplo
const BaseModel = require('./BaseModel');

module.exports = class Pessoa extends BaseModel {
  table = 'pessoa';
  fields = {
    "id": {
      type: this.DataTypes.INTERGER,
      auto_increment: true,
      nullable: true,
      primary_key: true
    },
    "nome": {
      type: this.DataTypes.STRING,
      nullable: false
    },
    "email": {
      type: this.DataTypes.STRING,
      nullable: false
    },
    "user_id": {
      type: this.DataTypes.INTERGER,
      nullable: false,
      foreign_key: true
    }
  };

  relation: {
    user: require('./User.js')
  }

  constructor() { super() }

  // retorna promise<Model>
  // exemplo de relação onde pessoa referência user
  user() {
    return this.belongsTo('user_id', this.relation.user);
  }
}
```

#### Definição do cast

``` js 
// exemplo
const BaseModel = require('./BaseModel');

module.exports = class Pessoa extends BaseModel {
  table = 'pessoa';
  fields = {
    "id": {
      type: this.DataTypes.INTERGER,
      auto_increment: true,
      nullable: true,
      primary_key: true
    },
    "nome": {
      type: this.DataTypes.STRING,
      nullable: false
    },
    "email": {
      type: this.DataTypes.STRING,
      nullable: false
    },
    "user_id": {
      type: this.DataTypes.INTERGER,
      nullable: false,
      foreign_key: true
    },
    "perfil": {
      type: this.DataTypes.JSON,
      nullable: true
    }
  };

  cast = {
    perfil: "json"
  }

  constructor() { super() }
}
```
