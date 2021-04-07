import BaseWhere from './basewhere'
import comparison from '../type/comparison'

declare interface WhereArgument extends BaseWhere {
  comparison?: comparison;
  value: any;
}

export = WhereArgument