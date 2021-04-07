import Model from './Model'
import Prototype from './Prototype'
import Collection from './Collection'

import Config from './interface/config'
import Fields from './interface/field'
import OrderByArgument from './interface/orderbyargument'
import BaseWhere from './interface/basewhere'
import WhereArgument from './interface/whereArguments'


declare namespace Static {

}

declare class Static extends Prototype {
  constructor(config: Config);

  static _fields(): Fields;
  static select(args: string[]): Model;
  static orderBy(arg: OrderByArgument): Model;
  static whereNotNull(arg: BaseWhere): Model;
  static where(arg: WhereArgument): Model;
  static find(id: number): Model;
  static get(): Promise<Collection>;
  static insertGetId(json: object): Promise<number>;
  static create(json: object[]): Promise<Collection>;
  static create(json: object): Promise<Model>;
}

export = Static;