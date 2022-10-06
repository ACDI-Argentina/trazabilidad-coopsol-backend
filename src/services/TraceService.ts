const hash = require("object-hash");

interface Trace {
  id?: string,
  [key: string]: any;
}


export default class TraceService {
  //where intialize contract? receive it as dependency?

  //ComputeHash and store
  saveProof(trace: Trace) {
    console.log("Save proof")
    const hashed = hash(trace, { algorithm: "SHA256", encoding: "hex" });
    
    //get cntract &* call save

    return hashed;
  }



}



