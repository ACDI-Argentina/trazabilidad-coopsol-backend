const { web3, getBeekeper, saveBeekeper, removeBeekeper, getBeekepersCount } = require("./lib/BeekeperContract");


(async function () {

  const beekeper = { // Usar typescript para definir el tipo beekeper
    id: "demo-28",
    fullname: "Jonatan Duttweiler",
    activityStartDate: new Date("10/01/1997"),
    location: "Sauzalito, Chaco, Argentina",
    infoCid: "infocid/jona-edited"
  }

  /* const result = await saveBeekeper(beekeper); 
  console.log(result); */

  const result = await getBeekeper("demo-28");
  console.log(result)

  console.log(`Beekepers count: ${await getBeekepersCount()}`)
})();