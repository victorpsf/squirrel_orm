import Connector from './Connector'

import WhereArgument from './interface/whereArguments'
import Cast from './interface/cast'
import JoinArgument from './interface/joinargument'
import Model from './Model';
import { ResultSetHeader } from 'mysql2';
import GetColumns from './interface/getcolumns'

declare namespace Builder {
  
}

declare class Builder extends Connector {
  selectFields: string[];
  whereFields: WhereArgument[];
  whereGroupBy: string;
  whereOrderBy: string;
  joinFields: JoinArgument[];
  insertFields: string[];
  insertValues: any[];
  builderCast: Cast;

  setCast(cast: Cast): void;
  usingCast(key: string, value: any): any;
  getMysqlValue(value: any): string;
  mapSplitField(value: string, index: number, array: any[]): string;
  mapSetSelect(value: string[], index: number, array: any[]): string;
  mapSetSelect(value: string, index: number, array: any[]): string;
  mapSplitAsValue(value: string, index: number, array: string[]): string;
  mapSplitSelectArray(arg: string[], index: number, array: string[]): string[];
  mapInsertValue(value: string, index: number, array: string[]): string;
  mapUpdateComplement(value: string, index: number, array: string[]): string;
  mapJoinQuery(value: JoinArgument, index: number, array: JoinArgument[]): string;
  mapSelectComplement(value: any, index: number, array: any[]): any;
  filterSelect(value: any, index: number, array: any[]): boolean;

  unsetSelect(): void;
  setSelect(arg: string[]): Model;
  getSelect(): string;

  unsetWhere(): void;
  setWhere(arg: WhereArgument): Model;
  getWhere(): string;

  unsetOrderBy(): void;
  setOrderBy(): Model;
  getOrderBy(): string;

  unsetInsertFields(): void;
  setInsertFields(): Model;
  getInsertFields(): string;

  unsetInsertValues(): void;
  setInsertValues(): Model;
  getInsertValues(): string;

  unsetUpdate(): void;
  setUpdate(): Model;
  getUpdate(): string;

  setUpdateWhere(arg: string[]): Model;

  unsetJoin(): void;
  setJoin(): Model;
  getJoin(): string;

  getColumns(): GetColumns;

  buildInsert(value: object[]): string;
  buildInsert(value: object): string;
  buildSelect(): string;
  buildDelete(): string;
  buildUpdate(): string;

  getResultHeaderId(arg: ResultSetHeader): number;
  getResultHeaderId(arg: ResultSetHeader): null;

  setJSONPropertiesModel(arg: { model: Model, json: object }): Model;
  setValuesInModel(result: ResultSetHeader, json: object, model: Model): Model;
}

export = Builder