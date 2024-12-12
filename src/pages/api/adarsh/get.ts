// pages/api/adarsh/get.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { connection } from '@/lib/db';

interface Record {
  id: number;
  name: string;
  age: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Execute query using the connection
      const [rows] = await connection.execute('SELECT * FROM adarsh');
      const records: Record[] = rows as Record[];
      return res.status(200).json(records);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch records' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
