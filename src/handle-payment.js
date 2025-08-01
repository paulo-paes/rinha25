import { checkStatus, updateBalance } from "./balance.js"
import { sendToGateway } from "./client/gateway.js"

export const handlePayments = async (request, reply) => {
  if (!valid(request.body)) {
    return reply.code(400).send()
  }
  const { correlationId, amount } = request.body
  const gat = await chooseGateway()
  await sendToGateway({ correlationId, amount, requestedAt: new Date() }, gat)
  await updateBalance(amount)
  return reply.code(200).send()
}


const chooseGateway = async () => {
  const gateways = await checkStatus()
  const TTL = gateways[1].updated_at
  if (Date.now() > TTL + 1000 * 5) {
    if (gateways[1].status === true) {
      return true
    } else {
      return false
    }
  } else {
    // CHECK BOTH GATEWAYS HEALTH
    await updateStatus()
  }
  
  return true
}


const valid = (obj) => {
  if (!obj || !obj.correlationId || !obj.amount) return false
  if (obj.correlationId.length === 0 || obj.amount === 0) return false
  return true
}