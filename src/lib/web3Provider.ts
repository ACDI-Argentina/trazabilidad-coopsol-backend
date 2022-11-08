require('dotenv').config()
import HDWalletProvider from "@truffle/hdwallet-provider";

const {
  NETWORK_URL,
  OWNER_PRIVATE_KEY
} = process.env;

const networkUrl = NETWORK_URL || ""; //Si alguno de estos dos no esta seteado, throw error

const web3Provider = new HDWalletProvider({
  privateKeys: [
    OWNER_PRIVATE_KEY!
  ],
  url: networkUrl,
});


export default web3Provider;