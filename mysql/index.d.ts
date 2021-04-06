import { Connection, RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2'

type orderby = 'ASC' | 'DESC'
type comparison = '=' | '<' | '>' | '<=' | '>=' | '!='
type cast = 'array' | 'json'

interface DATA_TYPES {
  INTERGER: number;
  STRING: number;
  TEXT: number;
  DATE: number;
  DATE_TIME: number;
  TIME: number;
  FLOAT: number;
}

interface Config {
  database: string;
  host: string;
  port: number | string;
  user: string;
  password: string;
}

interface Fields {
  [key: string]: {
    type?: number,
    auto_increment?: boolean,
    nullable: boolean,
    primaryKey: boolean
  }
}

interface BaseWhere {
  column: string;
}

interface OrderByArgument extends BaseWhere {
  order: orderby;
}

interface WhereArgument extends BaseWhere {
  comparison?: comparison;
  value: any;
}

interface Cast {
  [key: string]: cast;
}

interface Relation {
  [key: string]: Model
}

interface BaseExecute {
  query: string;
}

interface ExecuteReader extends BaseExecute {
  model: Model;
  cast?: Cast;
}

class RegExpUtil {
  static RegexpASC(code: number): string;
  static StringRegExp(value: string): string;
}

class Collection {
  original: any[];

  constructor(data: any[], model: Model);

  all(): Model[];
  toArray(): object[];
  where(arg: WhereArgument): Collection;
  map(func: (value: any, index: number, array: any[]) => any): Collection;
  filter(func: (value: any, index: number, array: any[]) => any): Collection;
  orderBy(column: string, type: orderby): Collection;
  first(): Model;
  last(): Model;

}

class Util {
  util: typeof import('util');

  static in_array(array: any[], value: any): boolean;
  in_array(array: any[], value: any): boolean;
  emptyArray(array: any[]): boolean;
  static getClassMethods(classInstance: any): string[];
  getClassMethods(classInstance: any): string[];
  getNumber(value: string): number;
  isUndefined(value: any): boolean;
  isNull(value: any): boolean;
  isNullOrUndefined(value: any): boolean;
  isString(value: any): boolean;
  isDateTime(value: any): boolean;
  isDate(value: any): boolean;
  isTime(value: any): boolean;
  isBoolean(value: any): boolean;
  isNumber(value: any): boolean;
  isObject(value: any): boolean;
  isArray(value: any): boolean;
  isEmail(value: any): boolean;
}

class Properties extends Util {
  mysql: typeof import('mysql2');
  collection: Collection;
  config: Config

  static DataTypes: DATA_TYPES;
  DataTypes: DATA_TYPES;

  table: string;
  fields: Fields;
  relation: Relation;
  cast: Cast;
  util: Util;

  setConfig(config: Config): void;
  getConfig(config: Config): Config;
}

class Connector extends Properties {
  client?: Connection;

  createConnection(): Connection;
  open(): Promise<void>;
  close(): Promise<void>;
  ExecuteReader(arg: ExecuteReader): Promise<Collection>;
  ExecuteQuery<T extends | RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(arg: BaseExecute): Promise<T>;
  ExecuteQueryEffect<T extends | RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(arg: BaseExecute): Promise<T>;
}

class Builder extends Connector {
  selectFields: string[];
  whereFields: WhereArgument[];
  whereGroupBy: string;
  whereOrderBy: string;
  insertFields: string[];
  insertValues: any[];
  builderCast: Cast;

  setCast(cast: Cast): void;
  usingCast(key: string, value: any): any;
  getMysqlValue(value: any): string;
  mapSplitField(arg: string): string;
  mapSplitSelectArray(arg: string[]): string[];
  mapInsertValue(value: string): string;
  filterSelect(value: any): boolean;
  mapSelectComplement(value: any, index: number, array: any[]): any;
  unsetSelect(): void;
  setSelect(arg: string[]): void;
  getSelect(): string;
  unsetWhere(): void;
  setWhere(arg: WhereArgument): void;
  getWhere(): string;
  unsetOrderBy(): void;
  setOrderBy(): void;
  getOrderBy(): string;
  unsetInsertFields(): void;
  setInsertFields(): void;
  getInsertFields(): string;
  unsetInsertValues(): void;
  setInsertValues(): void;
  getInsertValues(): string;
  buildInsert(value: object[]): string;
  buildInsert(value: object): string;
  buildSelect(): string;
}

class Prototype extends Builder {
  toJSON(): object;
  select(arg: string[]): Model;
  orderBy(arg: OrderByArgument): Model;
  whereNotNull(arg: BaseWhere): Model;
  where(arg: WhereArgument): Model;
  find(id: number): Promise<Model>;
  get(): Promise<Collection>;
  delete(): Promise<boolean>;
  save(): Promise<void>;
  belongsTo(field: string, model: Model): Promise<Model>;
  hasMany(field: string, model: Model): Promise<Collection>;
}

class Static extends Prototype {
  constructor(config: Config);

  static _fields(): Fields;
  static select(args: string[]): Model;
  static orderBy(arg: OrderByArgument): Model;
  static whereNotNull(arg: BaseWhere): Model;
  static where(arg: WhereArgument): Model;
  static find(id: number): Model;
  static get(): Promise<Collection>;
  static insertGetId(json: object): Promise<number>;
  static create(json: array[object]): Promise<Collection>;
  static create(json: object): Promise<Model>;
}

class Model extends Static {
  constructor(config: Config);

  static instance(): Model;
}

export = {
  Model,
  Collection,
  RegExpUtil,
  DATA_TYPES
}