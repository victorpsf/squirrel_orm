import Collection from './Collection'
import Properties from './Properties'

import { Connection, RowDataPacket, OkPacket, ResultSetHeader } from "mysql2";
import ExecuteReader from './interface/executereader'
import BaseExecute from './interface/baseexecute'


declare namespace Connector {

}

declare class Connector extends Properties {
  connection?: Connection;

  createConnection(): Connection;
  open(): Promise<void>;
  close(): Promise<void>;
  ExecuteReader(arg: ExecuteReader): Promise<Collection>;
  ExecuteQuery<T extends | RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(arg: BaseExecute): Promise<T>;
}

export = Connector