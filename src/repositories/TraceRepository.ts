import { Trace } from "../types"

export interface TraceRepository {
  save(trace: Trace): Promise<unknown>
  findById(id: string): Promise<unknown>
}
