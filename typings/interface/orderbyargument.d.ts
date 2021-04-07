import BaseWhere from './basewhere'
import orderby from '../type/orderby'

declare interface OrderByArgument extends BaseWhere {
  order: orderby;
}

export = OrderByArgument