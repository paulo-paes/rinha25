import { getSummary } from "./balance.js"

export const paymentsSummary = async (request, reply) => {
  return getSummary()
}