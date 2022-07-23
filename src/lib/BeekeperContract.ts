require('dotenv').config()
import { AbiItem } from 'web3-utils'
import { Beekeper } from "../types/index";
import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3"
import BeekepersRegistryMetadata from "../artifacts/BeekepersRegistry_metadata.json"

const {
  NETWORK_URL,
  MNEMONIC,
  BEEKEPERS_REGISTRY_ADDRESS
} = process.env;


const networkUrl = NETWORK_URL || ""; //Si alguno de estos dos no esta seteado, throw error
const mnemonic = MNEMONIC || ""; //Si alguno de estos dos no esta seteado, throw error

const provider = new HDWalletProvider({
  mnemonic: mnemonic,
  url: networkUrl,
  addressIndex: 6
});

const web3 = new Web3(provider);
const abi = BeekepersRegistryMetadata.output.abi as AbiItem[];
const contract = new web3.eth.Contract(abi, BEEKEPERS_REGISTRY_ADDRESS);

async function getBeekeper(id: string) {
  return await contract.methods.beekepers(id).call();
}

async function saveBeekeper(beekeper: Beekeper) {

  const beekeperData = [
    beekeper.id,
    beekeper.fullname,
    beekeper.activityStartDate.getTime()/1000,
    beekeper.location,
    beekeper.infoCid,
];

  const accounts = await web3.eth.getAccounts();
  const result = await contract.methods.saveBeekeper(...beekeperData).send({ from: accounts[0] });
  return result;
}

async function removeBeekeper(id: string) {
  const accounts = await web3.eth.getAccounts();
  const result = await contract.methods.removeBeekeper(id).send({ from: accounts[0] });
  return result;
}

async function getBeekepersCount() { 
  return await contract.methods.size().call();
}


// At termination, `provider.engine.stop()' should be called to finish the process elegantly.
function stopProvider(){
  provider.engine.stop();
}


export {
  web3,
  stopProvider,
  getBeekeper,
  saveBeekeper,
  removeBeekeper,
  getBeekepersCount,
}

