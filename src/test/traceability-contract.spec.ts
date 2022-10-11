//import crypto from "crypto";
import crypto from "crypto";
import provider from "../lib/web3Provider";
import TraceabilityContract from "../lib/TraceabilityContract";


//Deployar smart contract de test y utilizar ese para registrar las keys
const { TRACEABILITY_OWNER, TRACEABILITY_REGISTRY_ADDRESS } = process.env;

jest.setTimeout(200000);
//Usar un addr de test

describe("Smart contract tests", () => {

  it("canary", () => {
    expect(true).toBe(true);
  })


  it("should store hash given a key in the smart contract", async () => {
    const traceability = new TraceabilityContract(provider, TRACEABILITY_REGISTRY_ADDRESS!, TRACEABILITY_OWNER!);
    const key = new Date().getTime().toString();
    const hash = crypto.createHash("SHA256").update(key).digest("hex");
    const tx = await traceability.storeHash(key, hash);
    expect(tx?.status).toEqual(true);
  })
  //should throw exception for dupped keys
  it("should throw exception for duplicated keys", async () => {
    const traceability = new TraceabilityContract(provider, TRACEABILITY_REGISTRY_ADDRESS!, TRACEABILITY_OWNER!);
    const key = new Date().getTime().toString();
    const hash = crypto.createHash("SHA256").update(key).digest("hex");
    const tx1 = await traceability.storeHash(key, hash);
    await expect(traceability.storeHash(key, hash)).rejects.toThrow();
  })

  /* get hash for unexistent key? */






})

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


