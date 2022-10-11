//Deployar smart contract de test y utilizar ese para registrar las keys


xdescribe("Smart contract tests", () => {
  it("canary", () => {
    expect(true).toBe(true);
  })
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


