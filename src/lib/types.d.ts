import { TransactionReceipt } from 'web3-core';
import { TransactionReceipt as TxReceipt } from "@ethersproject/abstract-provider";



export interface TraceabilityContractI {
    storeHash(traceId: string, hash: string): Promise<TransactionReceipt | TxReceipt | null>;
    getHash(traceId: string): Promise<string | null>
    getSender(): Promise<string>
}
