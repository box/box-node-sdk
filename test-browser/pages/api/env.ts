import type { NextApiRequest, NextApiResponse } from 'next';
import { testEnvList } from '../../sdkTest.config.mjs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const envObject = Object.fromEntries(
      testEnvList.map((env) => [env, process.env[env]]),
    );
    res.status(200).json(envObject);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
