import { traceService, traceRepository } from "../../../di";
import generateTraceRoutes from "./generateTraceRoutes";

const router = generateTraceRoutes(traceService, traceRepository);

export default router;