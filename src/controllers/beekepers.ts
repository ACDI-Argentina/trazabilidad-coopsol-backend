import { Application, Request, Response, NextFunction } from "express";
import { getAllBeekepersKeys, getBeekepersKey, getBeekeper, saveBeekeper, removeBeekeper, getBeekepersCount } from "../lib/BeekeperContract";
import { Beekeper } from "../types";
import validationMiddleware from "../middleware/validation.middleware";
import BeekeperDto from "../dto/BeekeperDto";


export const loadBeekepersEndpoints = (app: Application): void => {

  app.get("/beekepers/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const beekeper = await getBeekeper(id);
    if (beekeper) {
      res.json(beekeper);
    } else {
      res.status(404).json({ error: "Beekeper not found" });
    }
  })

  //TODO: implement security
  app.post("/beekepers", validationMiddleware(BeekeperDto) ,async (req: Request, res: Response, next: NextFunction) => {

    const {id, fullname, activityStartDate, location, infoCid=""} = req.body;
    const beekeper: Beekeper = {
      id,
      fullname,
      activityStartDate: new Date(activityStartDate),
      location,
      infoCid,
    }

    const tx = await saveBeekeper(beekeper); 
    res.json({beekeper, tx});
  });

//TODO: implement security
  app.delete("/beekepers/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const tx = await removeBeekeper(id);
    if (tx) {
      res.json(tx);
    } else {
      res.status(404).json({ error: "Beekeper not found" });
    }
  })
  
  app.get("/beekepers-count", async (req: Request, res: Response, next: NextFunction) => {
    const count = await getBeekepersCount();
    res.json({count});
  })

  app.get("/beekepers-keys", async (req: Request, res: Response, next: NextFunction) => {
    const keys = await getAllBeekepersKeys();
    res.json(keys);
  })

  app.get("/beekepers-keys/:index", async (req: Request, res: Response, next: NextFunction) => {
    const index = parseInt(req.params.index);
    const result = await getBeekepersKey(index);
    res.json(result);
  })

}