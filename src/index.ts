import crypto from "crypto";
import express from "express";
import { loadApiEndpoints } from "./controllers/api";
import TraceabilityContract from "./lib/TraceabilityContract";

import provider from "./lib/web3Provider";

const { TRACEABILITY_OWNER, TRACEABILITY_REGISTRY_ADDRESS } = process.env; //

//get traceabilityContract(add)
(async function () {
  try {    
    const traceability = new TraceabilityContract(provider, TRACEABILITY_REGISTRY_ADDRESS!,TRACEABILITY_OWNER!);
 
    const key = new Date().getTime().toString();
    const hash = crypto.createHash("SHA256").update(key).digest("hex");
    console.log(`Store hash for key ${key} ${hash}`)
    await traceability.storeHash(key,hash);
    console.log(`Stored`)

    console.log(`get hash for previous stored key (from smart contract)`)
    console.log(`stored hash:`, await traceability.getHash(key))

    console.log(`get hash for unexistent key`)
    console.log(`stored hash:`, await traceability.getHash("inexistent"))


  } catch (err) {
    console.log(err);
  }
})()




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