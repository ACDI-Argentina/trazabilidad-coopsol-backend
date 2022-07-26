import { Trace } from "../types";
import { TraceRepository } from "./TraceRepository";

const Datastore = require('nedb');
const db = new Datastore({ filename: 'db/demo.db', autoload: true });


class NeDBFileRepository implements TraceRepository {
  constructor() {

  }


  save(trace: Trace): Promise<unknown>  {
    return new Promise((resolve, reject) => {
      db.insert(trace, (err: any, newDoc: any) => {
        err && reject(err);
        resolve(newDoc);
      });
    });
  }
  
  findById(id: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      db.find({ id }, (err: any, docs: any) => {
        err && reject(err);

        if(docs && Array.isArray(docs) && docs.length > 0){
          const last = docs.length - 1;
          const found = docs[last];
          delete found._id;
          resolve(found);
        } else { 
          resolve(undefined);
        }
      });
    })
  }
}

export default NeDBFileRepository;