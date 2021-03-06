import Model from './Model'
import WhereArgument from './interface/whereArguments'
import orderby from './type/orderby'
import Cast from './interface/cast'

declare namespace Collection {

}

declare class Collection {
  original: any[];

  constructor(data: any[], model?: Model, cast?: Cast);

  all(): Model[];
  toArray(): object[];
  where(arg: WhereArgument): Collection;
  map(func: (value: any, index: number, array: any[]) => any): Collection;
  filter(func: (value: any, corecoreindex: number, array: any[]) => any): Collection;
  orderBy(column: string, type: orderby): Collection;
  first(): Model;
  last(): Model;

  static instance(data: any[], model?: Model, cast?: Cast): Collection;
}

export = Collection