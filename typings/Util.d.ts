declare namespace Util {}

declare class Util {
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
  isFunction(value: any): boolean;
}

export = Util