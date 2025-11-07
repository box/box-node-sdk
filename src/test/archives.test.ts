import { serializeArchiveV2025R0 } from '@/schemas/v2025R0/archiveV2025R0';
import { deserializeArchiveV2025R0 } from '@/schemas/v2025R0/archiveV2025R0';
import { serializeCreateArchiveV2025R0RequestBody } from '@/managers/archives';
import { deserializeCreateArchiveV2025R0RequestBody } from '@/managers/archives';
import { serializeUpdateArchiveByIdV2025R0RequestBody } from '@/managers/archives';
import { deserializeUpdateArchiveByIdV2025R0RequestBody } from '@/managers/archives';
import { serializeArchivesV2025R0 } from '@/schemas/v2025R0/archivesV2025R0';
import { deserializeArchivesV2025R0 } from '@/schemas/v2025R0/archivesV2025R0';
import { UpdateArchiveByIdV2025R0OptionalsInput } from '@/managers/archives';
import { UpdateArchiveByIdV2025R0Optionals } from '@/managers/archives';
import { BoxClient } from '@/client';
import { ArchiveV2025R0 } from '@/schemas/v2025R0/archiveV2025R0';
import { CreateArchiveV2025R0RequestBody } from '@/managers/archives';
import { UpdateArchiveByIdV2025R0RequestBody } from '@/managers/archives';
import { ArchivesV2025R0 } from '@/schemas/v2025R0/archivesV2025R0';
import { GetArchivesV2025R0QueryParams } from '@/managers/archives';
import { getUuid } from '@/internal/utils';
import { getEnvVar } from '@/internal/utils';
import { getDefaultClientWithUserSubject } from './commons';
import { toString } from '@/internal/utils';
import { sdToJson } from '@/serialization/json';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
export const userId: string = getEnvVar('USER_ID');
export const client: BoxClient = getDefaultClientWithUserSubject(userId);
test('testArchivesCreateListDelete', async function testArchivesCreateListDelete(): Promise<any> {
  const archiveName: string = getUuid();
  const archiveDescription: string = 'Test Archive Description';
  const archive: ArchiveV2025R0 = await client.archives.createArchiveV2025R0({
    name: archiveName,
    description: archiveDescription,
  } satisfies CreateArchiveV2025R0RequestBody);
  if (!((toString(archive.type) as string) == 'archive')) {
    throw new Error('Assertion failed');
  }
  if (!(archive.name == archiveName)) {
    throw new Error('Assertion failed');
  }
  if (!(archive.description == archiveDescription)) {
    throw new Error('Assertion failed');
  }
  const newArchiveName: string = getUuid();
  const newArchiveDescription: string = 'Updated Archive Description';
  const updatedArchive: ArchiveV2025R0 =
    await client.archives.updateArchiveByIdV2025R0(archive.id, {
      requestBody: {
        name: newArchiveName,
        description: newArchiveDescription,
      } satisfies UpdateArchiveByIdV2025R0RequestBody,
    } satisfies UpdateArchiveByIdV2025R0OptionalsInput);
  if (!(updatedArchive.name == newArchiveName)) {
    throw new Error('Assertion failed');
  }
  if (!(updatedArchive.description! == newArchiveDescription)) {
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
