// pages/api/adarsh/delete.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import {connection} from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

    try {
      const [results]: any = await connection.execute(
        'DELETE FROM adarsh WHERE id = ?',
        [id]
      );

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Record not found' });
      }
      return res.status(200).json({ message: 'Record deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete record' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
