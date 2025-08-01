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

}