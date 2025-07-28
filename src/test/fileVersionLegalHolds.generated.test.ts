import { serializeFileVersionLegalHolds } from '../schemas/fileVersionLegalHolds.generated.js';
import { deserializeFileVersionLegalHolds } from '../schemas/fileVersionLegalHolds.generated.js';
import { FileVersionLegalHolds } from '../schemas/fileVersionLegalHolds.generated.js';
import { GetFileVersionLegalHoldsQueryParams } from '../managers/fileVersionLegalHolds.generated.js';
import { generateByteStream } from '../internal/utils.js';
import { getUuid } from '../internal/utils.js';
import { BoxClient } from '../client.generated.js';
import { getDefaultClient } from './commons.generated.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const client: BoxClient = getDefaultClient();
test('testGetFileVersionLegalHolds', async function testGetFileVersionLegalHolds(): Promise<any> {
  const policyId: string = '1234567890';
  const fileVersionLegalHolds: FileVersionLegalHolds =
    await client.fileVersionLegalHolds.getFileVersionLegalHolds({
      policyId: policyId,
    } satisfies GetFileVersionLegalHoldsQueryParams);
  const fileVersionLegalHoldsCount: number =
    fileVersionLegalHolds.entries!.length;
  if (!(fileVersionLegalHoldsCount >= 0)) {
    throw new Error('Assertion failed');
  }
});
test('testGetFileVersionLegalHoldById', async function testGetFileVersionLegalHoldById(): Promise<any> {
  const fileVersionLegalHoldId: string = '987654321';
  await expect(async () => {
    await client.fileVersionLegalHolds.getFileVersionLegalHoldById(
      fileVersionLegalHoldId,
    );
  }).rejects.toThrow();
});
export {};
