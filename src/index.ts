import express from "express";
import traceRouter from "./routes/api/v1/trace";
import infoRouter from "./routes/info";


import cors from "cors";
import { errorHandler } from "./handlers/errorHandler";


const app = express();
app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/trace", traceRouter);
app.use("/", infoRouter);
app.use(errorHandler);

console.log(`NODE ENV`,process.env.NODE_ENV)

app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  
  console.log(`Using env: `);
  console.log(`TRACEABILITY_OWNER:`, process.env.TRACEABILITY_OWNER )
  console.log(`TRACEABILITY_REGISTRY_ADDRESS:`, process.env.TRACEABILITY_REGISTRY_ADDRESS)

})