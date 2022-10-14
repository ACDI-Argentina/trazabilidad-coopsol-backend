import express from "express";
import traceRouter from "./routes/api/v1/trace";
import { Request, Response, NextFunction, Router } from "express";
import Boom from '@hapi/boom';

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/trace", traceRouter);
app.use("/", (req,res,next) => {
  
  return res.json({
    "name": "trazabilidad-blockchain-backend",
    "version": "1.0.0",
  });
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if(Boom.isBoom(err)){    
    return res.status(err.output.statusCode).json(err.output.payload);
  } else {
    console.log("Error handling")
    console.error(err.stack)
    res.status(500).send({
      error: err.name,
      message: err.message,
      stack: process.env.NODE_ENV !=="production" ? err.stack: undefined 
    });
  }
})

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