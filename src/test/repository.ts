import MongoDbRepository from "../repositories/MongoDbRepository";

const url = 'mongodb://172.17.0.2:27017/';

async function test(){

    try{
        
        console.log("TEEST")
        const repo = new MongoDbRepository(url,"mongo-trace", "traces");
        await repo.connect();
    
        const result = await repo.save({
            id: "12134",
            origen: "prueba2-updated"
        })
    

        console.log("stored:")
        console.log(result)

        const found = await repo.findById("12134")
        console.log(found)



    } catch(err){
        console.log(err);
    }


}
test();