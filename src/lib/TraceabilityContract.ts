require('dotenv').config()
import { AbiItem } from 'web3-utils'
import Web3 from "web3"
import Traceability from "../artifacts/Traceability_metadata.json"
import { provider as Provider } from 'web3-core';
import { Contract } from 'web3-eth-contract';


export default class TraceabilityContract {
  web3: Web3
  private abi: AbiItem[]
  private accounts: string[]
  private sender: string
  contract: Contract

  constructor(provider: Provider, contractAddress: string, senderAddress: string) {
    const web3 = new Web3(provider);
    const abi = Traceability.output.abi as AbiItem[];
    const contract = new web3.eth.Contract(abi, contractAddress);
    web3.eth.getAccounts().then(accounts => {
      this.accounts = accounts;
      this.sender = accounts[0];
    });

    this.web3 = web3;
    this.abi = abi;
    this.contract = contract;
    
    if(senderAddress){
      this.sender = senderAddress;
    }

  }

  async getSender(): Promise<string>{
    if (!this.sender) {
      const accounts = await this.web3.eth.getAccounts();
      this.accounts = accounts;
      this.sender = accounts[0];
    }
    return this.sender;
  }


  async storeHash(traceId: string, hash: string): Promise<string | null> {
    console.log(`store hash: ${traceId}, ${hash}`)
    const sender = await this.getSender();

    //Handle known errors
    const response = await this.contract.methods.storeHash(traceId, hash).send({ from: sender });
    console.log(response);
    return response;
  }

  async getHash(traceId: string): Promise<string | null> {
    const response = await this.contract.methods.hashes(traceId).call();
    return response;
  }
}
