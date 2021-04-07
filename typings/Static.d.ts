import Model from './Model'
import Prototype from './Prototype'
import Collection from './Collection'

import Fields from './interface/field'
import OrderByArgument from './interface/orderbyargument'
import BaseWhere from './interface/basewhere'
import WhereArgument from './interface/whereArguments'
import JoinArgument from './interface/joinargument'
import { ConnectionOptions } from 'mysql2/typings/mysql'


declare namespace Static {

}

declare class Static extends Prototype {
  constructor(config: ConnectionOptions);

  static _fields(): Fields;
  static select(args: string[][]): Model;
  static select(args: string[]): Model;
  static orderBy(arg: OrderByArgument): Model;
  static whereNotNull(arg: BaseWhere): Model;
  static where(arg: WhereArgument): Model;
  static join(arg: JoinArgument): Model;
  static find(id: number): Model;
  static get(): Promise<Collection>;
  static insertGetId(json: object): Promise<number>;
  static create(arg: object[]): Promise<Collection>;
  static create(arg: object): Promise<Model>;
}

export = Static;