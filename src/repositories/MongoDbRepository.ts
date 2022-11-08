import { Trace } from "../types";
import { Collection, Document, MongoClient } from 'mongodb'
import { TraceRepository } from "./TraceRepository";

class MongoDbRepository implements TraceRepository {
    connected: boolean;
    url: string;
    dbName: string;
    collectionName: string;
    collection: Collection<Document>;

    constructor(url: string, dbName: string, collectionName: string) {
        this.url = url;
        this.dbName = dbName;
        this.collectionName = collectionName;
    }

    async connect() {
        //connect and expose connection
        const client = new MongoClient(this.url);
        await client.connect();
        const db = client.db(this.dbName);
        const collection = db.collection(this.collectionName);
        this.connected = true;
        this.collection = collection;

    }

    async save(trace: Trace): Promise<unknown> {
        if(!this.connected) throw new Error("Mongo Db is disconnected");
        const result = await this.collection.updateOne({ id: trace.id }, { $set: trace }, { upsert: true });
        return result;
    }
    async findById(id: string): Promise<unknown> {
        if(!this.connected) throw new Error("Mongo Db is disconnected");
        const mongoDoc = await this.collection.findOne({id: id});
        const doc: any = mongoDoc;
        delete doc._id;
        return doc;
    }






}

export default MongoDbRepository;