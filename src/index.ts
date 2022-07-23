import { web3, getBeekeper, saveBeekeper, removeBeekeper, getBeekepersCount } from "./lib/BeekeperContract"; 

(async function () {

  const beekeper = { 
    id: "demo-28",
    fullname: "Jonatan Duttweiler",
    activityStartDate: new Date("10/01/1997"),
    location: "Sauzalito, Chaco, Argentina",
    infoCid: "infocid/jona-edited"
  }

  const result = await saveBeekeper(beekeper); 
  console.log(result);

  /* const result = await getBeekeper("demo-28");
  console.log(result) */


  console.log(`Beekepers count: ${await getBeekepersCount()}`)
})();