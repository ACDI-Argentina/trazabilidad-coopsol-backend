import { Request, Response, NextFunction, Router } from "express";
import { traceService } from "../../../di";
//Usamos di? para inicializar el contract? o el service? Tambien podriamos recibirlo como parametro



const router = Router();
//api/v1/tyrace

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.log(`Handle trace get`);
  res.send("foobar")

})
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  //TODO: validar que req.body sea un trace
  try {
    const data = req.body;
    const hash = await traceService.saveProof(data);

    return res.json({
      hash
    });

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