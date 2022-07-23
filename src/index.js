const { web3, getBeekeper, saveBeekeper, removeBeekeper, getBeekepersCount } = require("./lib/BeekeperContract");


(async function(){
  
  const beekeperData = [ //Usar typescript, necesitamos un array de longitud 5
    "demo-27",
    "Jonatan Duttweiler",
    1443668400,
    "Sauzalito, Chaco, Argentina",
    "infocid/jona-edited"
  ]

  //const result = await saveBeekeper(beekeperData);
  //console.log(result);


  const result = await getBeekeper("demo-27");
  console.log(result)
  console.log(`Beekepers count: ${await getBeekepersCount()}`)
})();