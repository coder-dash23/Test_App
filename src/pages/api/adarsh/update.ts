import type { NextApiRequest, NextApiResponse } from 'next';
import { connection } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { id, name, age } = req.body;

    if (!id || !name || !age) {
      return res.status(400).json({ error: 'Missing required fields: id, name, age' });
    }

    try {
      const [result]: any = await connection.execute(
        'UPDATE adarsh SET name = ?, age = ? WHERE id = ?',
        [name, age, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Record not found' });
      }

      return res.status(200).json({ message: 'Record updated successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to update record' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
