require('dotenv').config()
import { AbiItem } from 'web3-utils'
import { Beekeper } from "../types/index";
import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3"
import BeekepersRegistryMetadata from "../artifacts/BeekepersRegistry_metadata.json"
import provider from "../lib/web3Provider";

const {
  BEEKEPERS_REGISTRY_ADDRESS,
} = process.env;

const web3 = new Web3(provider);
const abi = BeekepersRegistryMetadata.output.abi as AbiItem[];
const contract = new web3.eth.Contract(abi, BEEKEPERS_REGISTRY_ADDRESS);

async function getBeekeper(id: string): Promise<Beekeper | null> {
  const response = await contract.methods.beekepers(id).call();
  if(response.id){
    return {
      id: response.id,
      fullname: response.fullname,
      activityStartDate: new Date(response.activityStartDate * 1000),
      location: response.location,
      infoCid: response.infoCid,
    }
  }
  return null;
}


async function getAllBeekepersKeys(){
  const count = parseInt(await contract.methods.size().call());
  const producersKeys = [];
  
  for(let idx = 0; producersKeys.length < count; idx++){ 

    const { key, deleted } = await contract.methods.keys(idx).call(); //Esto puede fallar
    !deleted && producersKeys.push(key);
  } 

  return producersKeys;
}

async function getBeekepersKey(index: Number) {
  const { key, deleted } = await contract.methods.keys(index).call(); //Esto puede fallar
  return { key, deleted };
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
  /* TODO: implementar eventos para obtener el valor de replaced */
  const result = await contract.methods.saveBeekeper(...beekeperData).send({ from: accounts[0] }); 
  return result;
}

async function removeBeekeper(id: string) {
  const accounts = await web3.eth.getAccounts();
  /*TODO: Obtener el valor de success retornado por la funcion */
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
  getAllBeekepersKeys,
  getBeekepersKey,
  saveBeekeper,
  removeBeekeper,
  getBeekepersCount,
}

