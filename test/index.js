const Login = require('./login')

const login = new Login();

const build = async function () {
  let query = await login.where({ column: 'acesso', value: '123' }).orderBy({ column: 'id', order: 'desc' }).get();
}

build();