import fastify from 'fastify'
import { handlePayments } from './handle-payment.js'
import { paymentsSummary } from './payments-summary.js'
import { Pool } from 'pg';

const server = fastify({ logger: true })

export const db = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'rinha',
  max: 30
});


server.post('/payments', handlePayments)
server.get('/payments-summary', paymentsSummary)

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})