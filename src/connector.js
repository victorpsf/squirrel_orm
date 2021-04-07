const Properties = require('./properties')

module.exports = class Connector extends Properties {
  constructor() { super() }

  // create connection
  createConnection() {
    this.client = this.mysql.createConnection({
      connectTimeout: 12000,
      multipleStatements: false,
      ...this.configs
    })
  }

  // open connection
  open() {    
    if ((this.client || null) == null) this.createConnection()

    return new Promise((resolve, reject) => {
      this.client.connect((err) => {
        if (err) return reject(err)
        return resolve()
      })
    })
  }

  // close connection
  close() {
    return new Promise((resolve, reject) => {
      this.client.end((err) => {
        if (err) return reject(err)
        delete this.client
        return resolve()
      })
    })
  }

  /**
   * @param {query,model,cast} args 
   * 
   * execução de query SELECT
   * 
   * @returns 
   */
  ExecuteReader(args = { query: '', model: '', cast: null }) {
    return new Promise(async (resolve, reject) => {
      const BASEMODEL = require('./model')
      if (!(args.model instanceof BASEMODEL)) throw new Error(`Connector ExecuteReader: argument model is not instance of ORM BASEMODEL`)

      try {
        if (!this.client) await this.open()
        this.client.execute(args.query, async (error, data) => {
          await this.close()
          if (error) return reject(error)
          return resolve(new this.collection(data, args.model.constructor, args.cast))
        })
      } catch (error) {
        return reject(error)
      }
    })
  }

  /**
   * @param {*} args 
   * 
   * execução de querys INSERT, DELETE, UPDATE
   * 
   * @returns 
   */
  ExecuteQuery(args = { query: '' }) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.client) await this.open()
        this.client.execute(args.query, async (error, data) => {
          await this.close()
          if (error) return reject(error)
          return resolve(data)
        })
      } catch (error) {
        return reject(error)
      }
    })
  }
}