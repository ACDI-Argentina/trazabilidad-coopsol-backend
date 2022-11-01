import TraceabilityContract from "./lib/TraceabilityContract";
import TraceService from "./services/TraceService";
import provider from "./lib/web3Provider";
import TraceRepository from "./repositories/TraceRepository";
import LacchainTraceabilityContract from "./lib/LacchainTraceabilityContract";
import { GasModelProvider } from "@lacchain/gas-model-provider";

const { TRACEABILITY_OWNER, TRACEABILITY_REGISTRY_ADDRESS } = process.env;
const traceabilityContract = new TraceabilityContract(provider, TRACEABILITY_REGISTRY_ADDRESS!, TRACEABILITY_OWNER!);


export const traceRepository = new TraceRepository();
export const traceService = new TraceService(traceabilityContract, traceRepository);


const { LACCHAIN_NETWORK_URL, LACCHAIN_NODE_ADDRESS, LACCHAIN_USER_PRIVATE_KEY, LACCHAIN_TRACEABILITY_ADDRESS } = process.env;

console.log(`Lacchain network url: ${LACCHAIN_NETWORK_URL}. Lacchain node address: ${LACCHAIN_NODE_ADDRESS}`);

const providerLacchain = new GasModelProvider(LACCHAIN_NETWORK_URL);
const lacchainContract = new LacchainTraceabilityContract(providerLacchain, LACCHAIN_TRACEABILITY_ADDRESS!, LACCHAIN_NODE_ADDRESS!, LACCHAIN_USER_PRIVATE_KEY!);

export const traceServiceLacchain = new TraceService(lacchainContract, traceRepository);
(async () => {

    //await lacchainContract.storeHash("demo-key-3","c0cb7cea656c53c1a30a2c443ce0d3d4d9bf498c4b984cf089f832b2ba7166d9");

    const stored = await lacchainContract.getHash("demo-key-3");
    console.log(`stored:`, stored)
})()
