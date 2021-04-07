declare interface Config {
  database: string;
  host: string;
  port: number | string;
  user: string;
  password: string;
}

export = Config