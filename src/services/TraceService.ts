import TraceabilityContract from "../lib/TraceabilityContract";
import { TraceabilityContractI } from "../lib/types";
import TraceRepository from "../repositories/TraceRepository";
import { Trace } from "../types";

const objectHash = require("object-hash");
export const hash = (obj: Object, extraProps?: Object) => objectHash(obj, { algorithm: "SHA256", encoding: "hex", ...extraProps });



export default class TraceService {
  contract: TraceabilityContractI
  traceRepository: TraceRepository

  constructor(contract: TraceabilityContractI, traceRepository?: TraceRepository) {
    this.contract = contract;
    if(traceRepository){
      this.traceRepository = traceRepository;
    }
  }

  async saveProof(trace: Trace) {
    const type = typeof trace.id;
    if(type !== "string"){
      throw new Error(`Invalid id type. Expect string, got ${type}`)
    }

    //Se guardan los traces de forma local para poder avanzar con el desarrollo del front, la idea es obtener
    //estos datos del sistema de trazabilidad directamente
    if(this.traceRepository){
      //TODO: avoid overwrite!
      this.traceRepository.save(trace);
    }

    const hashed = hash(trace);
    const txReceipt = await this.contract.storeHash(trace.id, hashed);

    return {
      hash: hashed, 
      txReceipt: txReceipt
    };
  }


}



