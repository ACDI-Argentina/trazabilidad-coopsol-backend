const hash = require("object-hash");

type Trace = {
  id: string
}


export default class TraceService {
  //where intialize contract? receive it as dependency?

  //ComputeHash and store
  saveProof(trace: any) { //Should be an object
    console.log("Save proof")
    const hashed = hash(trace, { algorithm: "SHA256", encoding: "hex" });
    
    //get cntract &* call save

    return hashed;
  }



}



