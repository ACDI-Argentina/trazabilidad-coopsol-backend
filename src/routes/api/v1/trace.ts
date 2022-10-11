import { Request, Response, NextFunction, Router } from "express";
import { traceService } from "../../../di";

const router = Router();
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  //TODO: validar que req.body sea un trace
  try {
    const data = req.body;
    const result = await traceService.saveProof(data); 
    return res.json(result);

  } catch (err: any) {
    if(err instanceof Error){
      const message = err.message.includes("\n")?err.message.split("\n")[0]: err.message

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