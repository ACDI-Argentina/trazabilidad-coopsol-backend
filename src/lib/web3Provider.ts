require('dotenv').config()
import HDWalletProvider from "@truffle/hdwallet-provider";

const {
  NETWORK_URL,
  MNEMONIC,
} = process.env;

const networkUrl = NETWORK_URL || ""; //Si alguno de estos dos no esta seteado, throw error
const mnemonic = MNEMONIC || ""; //Si alguno de estos dos no esta seteado, throw error

const web3Provider = new HDWalletProvider({
  mnemonic: mnemonic,
  url: networkUrl,
});


export default web3Provider;