import BaseExecute from './baseexecute'
import Model from '../Model'
import Cast from './cast'

declare interface ExecuteReader extends BaseExecute {
  model: Model;
  cast?: Cast;
}

export = ExecuteReader