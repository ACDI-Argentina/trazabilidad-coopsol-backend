import crypto from "crypto";
import express from "express";
import { loadApiEndpoints } from "./controllers/api";
import TraceabilityContract from "./lib/TraceabilityContract";
import TraceService from "./services/TraceService";
import provider from "./lib/web3Provider";
const { trace1 } = require("./test/data");

const { TRACEABILITY_OWNER, TRACEABILITY_REGISTRY_ADDRESS } = process.env;


(async function () {
  try {
    const traceability = new TraceabilityContract(provider, TRACEABILITY_REGISTRY_ADDRESS!, TRACEABILITY_OWNER!);
    const traceService = new TraceService(traceability);
    const hashed = await traceService.saveProof({...trace1, id: `${new Date().getTime()}`}); //Comprobar que tenga el campo id: string antes de llamar al metodo
    


  } catch (err) {
    console.log(err);
  }
})()



 
/* 
const app = express();
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

loadApiEndpoints(app);

app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
})
 */