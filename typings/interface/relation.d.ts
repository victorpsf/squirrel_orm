import Model from '../Model'

declare interface Relation {
  [key: string]: Model
}

export = Relation