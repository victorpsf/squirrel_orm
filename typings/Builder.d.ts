import Connector from './Connector'

import WhereArgument from './interface/whereArguments'
import Cast from './interface/cast'

declare namespace Builder {
  
}

declare class Builder extends Connector {
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

export = Builder