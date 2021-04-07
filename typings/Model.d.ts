import Config from './interface/config'
import Static from './Static'


declare namespace Model {
}

declare class Model extends Static {
  constructor(config: Config);

  static instance(): Model;
}

export = Model