import Boom from "@hapi/boom";
import { Request, Response, NextFunction, Router } from "express";
import { traceService, traceRepository } from "../../../di";
import authenticationMiddleware from "../../../middleware/authentication.middleware";

const router = Router();

const { API_CLIENT_USERNAME, API_CLIENT_PASSWORD } = process.env; //TODO: Validar que esto exista

const auth = authenticationMiddleware({
  users: {
    [API_CLIENT_USERNAME!]: API_CLIENT_PASSWORD
  }
});

router.get("/", auth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { NODE_ENV = "development", TRACEABILITY_OWNER, TRACEABILITY_REGISTRY_ADDRESS } = process.env;

    res.json({
      environment: NODE_ENV,
      traceabilityOwner: TRACEABILITY_OWNER,
      tracebilityRegistryAddress: TRACEABILITY_REGISTRY_ADDRESS
    });
  } catch (err) {
    next(err);
  }
})

//Get trace from traceRepository
router.get("/query", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.query.id;
    if (!id || typeof id !== "string") {
      return next(Boom.badRequest());
    }
    const doc = await traceRepository.findById(id!);
    if(doc){
      return res.json(doc);
    } else {
      return res.status(404).json({message:"Not found"}); 
    }

  } catch (err) {
    next(err);
  }
})

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.query.id;
    if (!id || typeof id !== "string") {
      return next(Boom.badRequest());
    }
    const doc = await traceRepository.findById(id!);
    if(doc){
      return res.json(doc);
    } else {
      return res.status(404).json({message:"Not found"}); 
    }

  } catch (err) {
    next(err);
  }
})




router.post("/", auth, async (req: Request, res: Response, next: NextFunction) => {
  //TODO: validar que req.body sea un trace
  try {
    const data = req.body;
    const result = await traceService.saveProof(data);
    return res.json(result);

  } catch (err: any) {
    if (err instanceof Error) {
      const message = err.message.includes("\n") ? err.message.split("\n")[0] : err.message

      res.json({
        error: {
          name: err.name,
          message: message,
          stack: err.stack,
        }
      })

    }

  }
})




export default router;