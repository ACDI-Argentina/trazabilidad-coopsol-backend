import { traceServiceLacchain, traceRepository, lacchainContract } from "../../../di";
import generateTraceRoutes from "./generateTraceRoutes";

const base = generateTraceRoutes(traceServiceLacchain!, traceRepository);

/* Este endpoint es temporal ya que desde el front estamos teniendo errores de cors al tratar de interactuar con lacchain */
base.get("/:id/hash",async (req,res,next) => {
    const id = req.params.id;

    const stored = await lacchainContract!.getHash(id);
    if(typeof stored === "string" && stored.length > 0){
        res.json({
            hash: stored
        });
    } else {
        res.status(404).json(stored);
    }


})

export default base; 