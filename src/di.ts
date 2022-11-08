import TraceabilityContract from "./lib/TraceabilityContract";
import TraceService from "./services/TraceService";
import provider from "./lib/web3Provider";
import LacchainTraceabilityContract from "./lib/LacchainTraceabilityContract";
import { GasModelProvider } from "@lacchain/gas-model-provider";
import NeDBFileRepository from "./repositories/NeDBFileRepository";
import MongoDbRepository from "./repositories/MongoDbRepository";

const { REPOSITORY_MONGO_URL } = process.env;
const repository = new MongoDbRepository(REPOSITORY_MONGO_URL!, "mongo-trace", "traces");
repository.connect();

const { TRACEABILITY_OWNER, TRACEABILITY_REGISTRY_ADDRESS } = process.env;
const traceabilityContract = new TraceabilityContract(provider, TRACEABILITY_REGISTRY_ADDRESS!, TRACEABILITY_OWNER!);


export const traceRepository = repository;
export const traceService = new TraceService(traceabilityContract, traceRepository);

const { LACCHAIN_NETWORK_URL, LACCHAIN_NODE_ADDRESS, LACCHAIN_USER_PRIVATE_KEY, LACCHAIN_TRACEABILITY_ADDRESS } = process.env;

console.log(`Lacchain network url: ${LACCHAIN_NETWORK_URL}. Lacchain node address: ${LACCHAIN_NODE_ADDRESS}`);

//let c/variables & default values

//INitialize
//Export, pero hay que ver que cosas pueden dar exepciones
let lproviderLacchain;
let llacchainContract;
let ltraceServiceLacchain;

try {
    lproviderLacchain = new GasModelProvider(LACCHAIN_NETWORK_URL);
    llacchainContract = new LacchainTraceabilityContract(lproviderLacchain, LACCHAIN_TRACEABILITY_ADDRESS!, LACCHAIN_NODE_ADDRESS!, LACCHAIN_USER_PRIVATE_KEY!);
    ltraceServiceLacchain = new TraceService(llacchainContract, traceRepository);

} catch (err) {
    console.log(err);
}

export const providerLacchain = lproviderLacchain;
export const lacchainContract = llacchainContract;
export const traceServiceLacchain = ltraceServiceLacchain;
