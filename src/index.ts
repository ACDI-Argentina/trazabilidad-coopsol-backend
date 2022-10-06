import crypto from "crypto";
import express from "express";
import { loadApiEndpoints } from "./controllers/api";
import TraceabilityContract from "./lib/TraceabilityContract";

import TraceService from "./services/TraceService";

import provider from "./lib/web3Provider";

const { TRACEABILITY_OWNER, TRACEABILITY_REGISTRY_ADDRESS } = process.env; 

const traceService = new TraceService();
const trace = { id: "iddd", foo: 'bar', XCXC:"ASDF" };
const res = traceService.saveProof(trace)
console.log("done", res)

//expect e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855



//

//get traceabilityContract(add)
/* (async function () {
  try {    
    const traceability = new TraceabilityContract(provider, TRACEABILITY_REGISTRY_ADDRESS!,TRACEABILITY_OWNER!);
 
    const key = new Date().getTime().toString();
    const hash = crypto.createHash("SHA256").update(key).digest("hex");
    console.log(`Store hash for key ${key} ${hash}`)
    await traceability.storeHash(key,hash);
    console.log(`Stored`)

    console.log(`try to store repeated key`)
    try{
      await traceability.storeHash(key,hash);

    } catch(err){
      console.log(err);
    }


    console.log(`get hash for previous stored key (from smart contract)`)
    console.log(`stored hash:`, await traceability.getHash(key))

    console.log(`get hash for unexistent key`)
    console.log(`stored hash:`, await traceability.getHash("inexistent"))


  } catch (err) {
    console.log(err);
  }
})()
 */



/* 
const app = express();
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

loadApiEndpoints(app);

app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
})
 */