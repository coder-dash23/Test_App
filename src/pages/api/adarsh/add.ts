// pages/api/adarsh/add.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import {connection} from '@/lib/db';

interface RequestBody {
  name: string;
  age: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, age }: RequestBody = req.body;

    try {
      const [results]: any = await connection.execute(
        'INSERT INTO adarsh (name, age) VALUES (?, ?)',
        [name, age]
      );
      return res.status(200).json({ message: 'Record added successfully', id: results.insertId });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to add record' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
