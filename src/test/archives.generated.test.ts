import { serializeArchiveV2025R0 } from '../schemas/v2025R0/archiveV2025R0.generated.js';
import { deserializeArchiveV2025R0 } from '../schemas/v2025R0/archiveV2025R0.generated.js';
import { serializeCreateArchiveV2025R0RequestBody } from '../managers/archives.generated.js';
import { deserializeCreateArchiveV2025R0RequestBody } from '../managers/archives.generated.js';
import { serializeArchivesV2025R0 } from '../schemas/v2025R0/archivesV2025R0.generated.js';
import { deserializeArchivesV2025R0 } from '../schemas/v2025R0/archivesV2025R0.generated.js';
import { BoxClient } from '../client.generated.js';
import { ArchiveV2025R0 } from '../schemas/v2025R0/archiveV2025R0.generated.js';
import { CreateArchiveV2025R0RequestBody } from '../managers/archives.generated.js';
import { ArchivesV2025R0 } from '../schemas/v2025R0/archivesV2025R0.generated.js';
import { GetArchivesV2025R0QueryParams } from '../managers/archives.generated.js';
import { getUuid } from '../internal/utils.js';
import { getEnvVar } from '../internal/utils.js';
import { getDefaultClientWithUserSubject } from './commons.generated.js';
import { toString } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const userId: string = getEnvVar('USER_ID');
export const client: BoxClient = getDefaultClientWithUserSubject(userId);
test('testArchivesCreateListDelete', async function testArchivesCreateListDelete(): Promise<any> {
  const archiveName: string = getUuid();
  const archive: ArchiveV2025R0 = await client.archives.createArchiveV2025R0({
    name: archiveName,
  } satisfies CreateArchiveV2025R0RequestBody);
  if (!((toString(archive.type) as string) == 'archive')) {
    throw new Error('Assertion failed');
  }
  if (!(archive.name == archiveName)) {
    throw new Error('Assertion failed');
  }
  const archives: ArchivesV2025R0 = await client.archives.getArchivesV2025R0({
    limit: 100,
  } satisfies GetArchivesV2025R0QueryParams);
  if (!(archives.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
  await client.archives.deleteArchiveByIdV2025R0(archive.id);
  await expect(async () => {
    await client.archives.deleteArchiveByIdV2025R0(archive.id);
  }).rejects.toThrow();
});
export {};
