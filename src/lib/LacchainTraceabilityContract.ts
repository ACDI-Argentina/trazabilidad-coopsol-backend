import { GasModelProvider, GasModelSigner } from "@lacchain/gas-model-provider";

import { Contract, ContractReceipt, ContractTransaction } from "ethers";
import { TransactionReceipt } from 'web3-core';
import { TransactionReceipt as TxReceipt } from "@ethersproject/abstract-provider";
import Traceability from "../artifacts/Traceability_metadata.json";
import { TraceabilityContractI } from "./types";

class LacchainTraceabilityContract implements TraceabilityContractI {
    private provider: GasModelProvider
    private signer: GasModelSigner
    contract: Contract

    constructor(provider: GasModelProvider, contractAddress: string, nodeAddress: string, privateKey: string) {

        const expiration = 1836394529;
        const signer = new GasModelSigner(privateKey, provider, nodeAddress, expiration);
        this.provider = provider;
        this.signer = signer;

        this.contract = new Contract(contractAddress, Traceability.output.abi, signer);

    }
    getSender(): Promise<string> { //Address con el que se envian las tx
        return this.signer.getAddress();
    }

    async storeHash(traceId: string, hash: string): Promise<TransactionReceipt | TxReceipt> {
        const tx: ContractTransaction = await this.contract.storeHash(traceId, hash, { gasLimit: 500000, gasPrice: 0 });
        const receipt: ContractReceipt = await tx.wait();

        console.log(receipt);

        return receipt;

    }

    async getHash(traceId: string): Promise<string | null> {
        const storedHash = await this.contract.hashes(traceId);
        return storedHash;
    }

}

export default LacchainTraceabilityContract;