import TraceabilityContract from "./lib/TraceabilityContract";
import TraceService from "./services/TraceService";
import provider from "./lib/web3Provider";
import TraceRepository from "./repositories/TraceRepository";

const { TRACEABILITY_OWNER, TRACEABILITY_REGISTRY_ADDRESS } = process.env;
const traceability = new TraceabilityContract(provider, TRACEABILITY_REGISTRY_ADDRESS!, TRACEABILITY_OWNER!);


export const traceRepository = new TraceRepository();
export const traceService = new TraceService(traceability, traceRepository);
