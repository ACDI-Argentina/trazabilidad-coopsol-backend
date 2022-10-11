import TraceabilityContract from "./lib/TraceabilityContract";
import TraceService from "./services/TraceService";
import provider from "./lib/web3Provider";

const { TRACEABILITY_OWNER, TRACEABILITY_REGISTRY_ADDRESS } = process.env;
const traceability = new TraceabilityContract(provider, TRACEABILITY_REGISTRY_ADDRESS!, TRACEABILITY_OWNER!);

export const traceService = new TraceService(traceability);
