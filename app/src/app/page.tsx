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

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Vector Demo App</h1>
      </div>
    </main>
  )
} 