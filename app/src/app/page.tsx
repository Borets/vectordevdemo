import { Card, Title, BarChart, Subtitle } from '@tremor/react';
import { sql } from '@vercel/postgres';
import logger from '../lib/logger';

async function generateLog() {
  'use server'
  const actions = ['login', 'logout', 'view_page', 'click_button', 'api_call'];
  const action = actions[Math.floor(Math.random() * actions.length)];
  const userId = Math.floor(Math.random() * 1000);
  
  logger.info({
    action,
    userId,
    timestamp: new Date().toISOString(),
  });
}

async function getLogs() {
  const { rows } = await sql`
    SELECT 
      action,
      COUNT(*) as count
    FROM logs 
    GROUP BY action 
    ORDER BY count DESC 
    LIMIT 5
  `;
  return rows;
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