# Simples ORM baseado em orientação a objeto

Sim, você não leu errado, orientação a objeto.

Deixei aberto no npm para caso alguém queira aproveitar o pacote.
Pode realizar cópia do pacote tranquilamente é bom que evoluimos.

Uma simples demonstração de uso

<pre>
$ npm install --save squirrel_orm mysql2
</pre>


## Configuração

Crie uma class e coloque o nome que quiser, eu aconselho a colocar BaseModel

dentro dele você pode colocar a configuração de acesso ao servidor.


``` js
const { Model } = require('squirrel_orm');

module.exports = class BaseModel extends Model {
  constructor() {
    // da suporte as configurações do mysql2
    super({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: ''
    });
  }
}
```

Vale salientar que não recomendo a utilização do usuário root, o exemplo é para fim de exemplo apenas.

## criação do model
``` js
const BaseModel = require('./BaseModel');

module.exports = class Client extends BaseModel {
  table = 'cliente';

  // esses fields são para lembrar das configurações do banco de dados
  // ainda não tem utilidade real dentro do código
  // ainda falta implementar
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
    "cpf": {
      type: this.DataTypes.STRING,
      nullable: false
    }
    ,
    "email": {
      type: this.DataTypes.STRING,
      nullable: false
    },
    "telefone": {
      type: this.DataTypes.STRING,
      nullable: false
    }
  };
}
``` 

## exemplo de uso

### select

``` js
const Client = require('./Client');

(async () => {
  let clients = await Client.get(); // retorna Collection
})();
```

``` js
const Client = require('./Client');

(async () => {
  let clients = await Client.where({ column: 'id', value: 'id' }).get(); // retorna Collection
})();
```

``` js
const Client = require('./Client');

(async () => {
  let clients = await Client.find(1); // retorna Model
})();
```

``` js
const Client = require('./Client');

(async () => {
  let clients = await Client.select('nome').get(); // retorna Collection
})();
```

``` js
const Client = require('./Client');

(async () => {
  // IGUAL a select `nome` as `nm`
  // primeiro valor do array é o campo e o segundo é como você quer que ele seja retornado
  let clients = await Client.select(['nome', 'nm']).get(); // retorna Collection
})();
```

``` js
const Client = require('./Client');

(async () => {
  // IGUAL a select `nome` as `nm`
  // primeiro valor do array é o campo e o segundo é como você quer que ele seja retornado
  let clients = await Client.select('cliente.*').join({
    // para poder realizar consultas complexas, no contexto que você
    // pode realiar join com 2 ou mais tabelas
    table: 'cliente',
    // tabela referênciada
    target: 'compras',
    // campo da tabela
    tableField: 'id',
    // campo da tabela referênciada
    targetField: 'cliente_id'
  }).where({ column: 'cliente.id', value: 1 })
    .get(); // retorna Collection
})();
```

# prometo colocar mais informações sobre a biblioteca em breve abraços, por enquanto tenho que deixar utilizavel e sem bugs