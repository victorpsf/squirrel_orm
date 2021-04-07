import Collection from './Collection'
import Util from './Util'

import Config from './interface/config'
import DATA_TYPES from './interface/data_type'
import Fields from './interface/field'
import Relation from './interface/relation'
import Cast from './interface/cast'

declare namespace Properties { }

declare class Properties extends Util {
  mysql: typeof import('mysql2');
  collection: Collection;
  config: Config

  static DataTypes: DATA_TYPES;
  DataTypes: DATA_TYPES;

  table: string;

  fields: Fields;

  relation?: Relation;

  cast?: Cast;

  setConfig(config: Config): void;
  getConfig(config: Config): Config;
}

export = Properties