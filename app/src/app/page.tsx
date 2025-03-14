import { Card, Title, BarChart, Subtitle } from '@tremor/react';
import { Pool } from 'pg';
import logger from '../lib/logger';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL
});

async function generateLog() {
  'use server'
  const actions = ['login', 'logout', 'view_page', 'click_button', 'api_call'];
  const action = actions[Math.floor(Math.random() * actions.length)];
  const userId = Math.floor(Math.random() * 1000);
  
  try {
    const client = await pool.connect();
    try {
      await client.query(
        'INSERT INTO logs (action, user_id, timestamp) VALUES ($1, $2, NOW())',
        [action, userId]
      );
      
      logger.info({
        action,
        userId,
        timestamp: new Date().toISOString(),
      });
    } finally {
      client.release();
    }
  } catch (error) {
    logger.error('Failed to generate log', { error });
  }
}

async function getLogs() {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query(`
        SELECT 
          action,
          COUNT(*) as count
        FROM logs 
        GROUP BY action 
        ORDER BY count DESC 
        LIMIT 5
      `);
      return result.rows;
    } finally {
      client.release();
    }
  } catch (error) {
    logger.error('Failed to fetch logs', { error });
    return [];
  }
}

export default async function Home() {
  const logs = await getLogs();

  return (
    <main className="p-4">
      <Title>Vector.dev Demo Dashboard</Title>
      <Subtitle>Real-time log processing and visualization</Subtitle>
      
      <div className="mt-8">
        <Card>
          <Title>Log Actions Distribution</Title>
          <BarChart
            className="mt-6"
            data={logs}
            index="action"
            categories={["count"]}
            colors={["blue"]}
            yAxisWidth={48}
          />
        </Card>
      </div>

      <div className="mt-4">
        <form action={generateLog}>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Generate Random Log
          </button>
        </form>
      </div>
    </main>
  );
} 