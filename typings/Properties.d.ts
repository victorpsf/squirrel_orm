import Collection from './Collection'
import Util from './Util'

import DATA_TYPES from './interface/data_type'
import Fields from './interface/field'
import Relation from './interface/relation'
import Cast from './interface/cast'
import { ConnectionOptions } from 'mysql2/typings/mysql'

declare namespace Properties { }

declare class Properties extends Util {
  mysql: typeof import('mysql2');
  collection: Collection;
  config: ConnectionOptions;

  static DataTypes: DATA_TYPES;
  DataTypes: DATA_TYPES;

  table: string;

  fields: Fields;

  relation?: Relation;

  cast?: Cast;

  setConfig(config: ConnectionOptions): void;
  getConfig(config: ConnectionOptions): ConnectionOptions;
  setProperties(key: string, value: any): void;
}

export = Properties