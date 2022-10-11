import TraceabilityContract from "../lib/TraceabilityContract";

const objectHash = require("object-hash");
export const hash = (obj: Object, extraProps?: Object) => objectHash(obj, { algorithm: "SHA256", encoding: "hex", ...extraProps });

interface Trace {
  id: string,
  [key: string]: any;
}


export default class TraceService {
  contract: TraceabilityContract

  constructor(contract: TraceabilityContract) {
    this.contract = contract;
  }

  async saveProof(trace: Trace) {
    const hashed = hash(trace);
    await this.contract.storeHash(trace.id, hashed);
    return hashed;
  }


}



