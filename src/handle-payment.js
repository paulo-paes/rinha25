import { updateBalance } from "./balance.js"
import { sendToGateway } from "./client/gateway.js"

export const handlePayments = async (request, reply) => {
  if (!valid(request.body)) {
    return reply.code(400).send()
  }
  const { correlationId, amount } = request.body
  await sendToGateway({ correlationId, amount, requestedAt: new Date() })
  await updateBalance(amount)
  return reply.code(200).send()
}


const valid = (obj) => {
  if (!obj || !obj.correlationId || !obj.amount) return false
  if (obj.correlationId.length === 0 || obj.amount === 0) return false
  return true
}