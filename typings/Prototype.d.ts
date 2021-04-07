import Model from './Model'
import Collection from './Collection'
import Builder from './Builder'

import OrderByArgument from './interface/orderbyargument'
import BaseWhere from './interface/basewhere'
import WhereArgument from './interface/whereArguments'

declare namespace Prototype {

}

declare class Prototype extends Builder {
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

export = Prototype