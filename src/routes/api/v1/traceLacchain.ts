import { traceServiceLacchain, traceRepository } from "../../../di";
import generateTraceRoutes from "./generateTraceRoutes";

const router = generateTraceRoutes(traceServiceLacchain, traceRepository);

export default router;