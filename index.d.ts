// import http from 'http'
import SquirrelModel from './typings/Model'
import SquirrelDataType from './typings/DataType'
import SquirrelRegExpUtil from './typings/RegExpUtil'
import SqirrelUtil from './typings/Util'

export interface Model extends SquirrelModel {}
export interface Util extends SqirrelUtil {}
export interface RegExpUtil extends SquirrelRegExpUtil {}
export interface DATA_TYPE extends SquirrelDataType {}