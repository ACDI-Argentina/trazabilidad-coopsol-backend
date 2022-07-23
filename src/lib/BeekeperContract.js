require('dotenv').config()

const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const BeekepersRegistryMetadata = require("../artifacts/BeekepersRegistry_metadata.json");

const {
  NETWORK_URL,
  MNEMONIC,
  BEEKEPERS_REGISTRY_ADDRESS
} = process.env;

const provider = new HDWalletProvider({
  mnemonic: MNEMONIC,
  providerOrUrl: NETWORK_URL,
  addressIndex: 6
});

const web3 = new Web3(provider);
const abi = BeekepersRegistryMetadata.output.abi;
const contract = new web3.eth.Contract(abi, BEEKEPERS_REGISTRY_ADDRESS);


async function getBeekeper(id) {
  return await contract.methods.beekepers(id).call();
}

async function saveBeekeper(beekeper) {

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

async function removeBeekeper(id) { /* id: string */
  const accounts = await web3.eth.getAccounts();
  const result = await contract.methods.removeBeekeper(id).send({ from: accounts[0] });
  return result;
}

async function getBeekepersCount() { /* id: string */
  return await contract.methods.size().call();
}


// At termination, `provider.engine.stop()' should be called to finish the process elegantly.
function stopProvider(){
  provider.engine.stop();
}


module.exports = {
  web3,
  stopProvider,
  getBeekeper,
  saveBeekeper,
  removeBeekeper,
  getBeekepersCount,

}


/*   (async function () {
    
    const balance = await web3.eth.getBalance(accounts[0]); //wei
    const ethBalance = web3.utils.fromWei(balance);
    console.log(`${accounts[0]} ${ethBalance} ETH`); //101




    console.log(`Beekepers: ${}`);


    //const queryResult = await contract.methods.beekepers("20").call();
    //console.log(queryResult)

    //await saveBeekeper("demo-21")
    //saveBeekeper("demo-22")
    //saveBeekeper("demo-23")
    //saveBeekeper("demo-24")
    await saveBeekeper("demo-25")

    //await removeBeekeper("demo-23");
    //await removeBeekeper("demo-24");

    console.log(`Beekepers: ${await contract.methods.size().call()}`);

  })();
 */



