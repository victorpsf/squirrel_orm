declare interface FieldOption {
  type: number;
  auto_increment?: boolean;
  nullable: boolean;
  primary_key?: boolean;
  foreign_key?: boolean;
}

export = FieldOption