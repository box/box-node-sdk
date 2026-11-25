import { serializeAiSessionsV2026R0 } from '@/schemas/v2026R0/aiSessionsV2026R0';
import { deserializeAiSessionsV2026R0 } from '@/schemas/v2026R0/aiSessionsV2026R0';
import { serializeGetAiSessionsV2026R0QueryParamsSourceField } from '@/managers/aiSessions';
import { deserializeGetAiSessionsV2026R0QueryParamsSourceField } from '@/managers/aiSessions';
import { BoxClient } from '@/client';
import { AiSessionsV2026R0 } from '@/schemas/v2026R0/aiSessionsV2026R0';
import { GetAiSessionsV2026R0QueryParams } from '@/managers/aiSessions';
import { GetAiSessionsV2026R0QueryParamsSourceField } from '@/managers/aiSessions';
import { getDefaultClient } from './commons';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
export const client: BoxClient = getDefaultClient();
test('testAiSessionsWithNonExistentIdV2026R0', async function testAiSessionsWithNonExistentIdV2026R0(): Promise<any> {
  const aiSessionId: string = '123456';
  const aiSessions: AiSessionsV2026R0 =
    await client.aiSessions.getAiSessionsV2026R0({
      source: 'api' as GetAiSessionsV2026R0QueryParamsSourceField,
    } satisfies GetAiSessionsV2026R0QueryParams);
  if (!(aiSessions.entries.length >= 0)) {
    throw new Error('Assertion failed');
  }
  await expect(async () => {
    await client.aiSessions.deleteAiSessionByIdV2026R0(aiSessionId);
  }).rejects.toThrow();
});
export {};
