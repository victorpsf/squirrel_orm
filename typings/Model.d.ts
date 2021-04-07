import { ConnectionOptions } from 'mysql2/typings/mysql'
import Static from './Static'


declare namespace Model {
}

declare class Model extends Static {
  constructor(config: ConnectionOptions);

  static instance(): Model;
}

export = Model