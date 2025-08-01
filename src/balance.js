import { db } from "./index.js"

export const updateBalance = async (amount, def = true) => {
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    await client.query(
      `UPDATE balance SET value = value + ${amount}, total = total + 1 WHERE name = '${def ? 'def' : 'fall'}'`
    );

    await client.query('COMMIT');
  } catch (error) {
    console.error(error)
    await client.query('ROLLBACK');
  } finally {
    client.release()
  }
}


export const getSummary = async () => {
  const client = await db.connect();
  const { rows } = await client.query(`SELECT name, total, value FROM balance`)
  return {
    default: {
      totalRequests: rows[1].total,
      totalAmount: rows[1].value,
    },
    fallback: {
      totalRequests: rows[0].total,
      totalAmount: rows[0].value,
    }
  }
}


export const checkStatus = async () => {
  const client = await db.connect();
  const { rows } = await client.query(`SELECT name, status, updated_at FROM balance`)

  return rows
}

export const updateStatus = async () => {
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    await client.query(
      `UPDATE balance SET updated_at = now()`
    );

    await client.query('COMMIT');
  } catch (error) {
    console.error(error)
    await client.query('ROLLBACK');
  } finally {
    client.release()
  }
}