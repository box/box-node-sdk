import { serializeCollaborationAllowlistEntries } from '@/schemas/collaborationAllowlistEntries';
import { deserializeCollaborationAllowlistEntries } from '@/schemas/collaborationAllowlistEntries';
import { serializeCollaborationAllowlistEntry } from '@/schemas/collaborationAllowlistEntry';
import { deserializeCollaborationAllowlistEntry } from '@/schemas/collaborationAllowlistEntry';
import { serializeCreateCollaborationWhitelistEntryRequestBody } from '@/managers/collaborationAllowlistEntries';
import { deserializeCreateCollaborationWhitelistEntryRequestBody } from '@/managers/collaborationAllowlistEntries';
import { serializeCreateCollaborationWhitelistEntryRequestBodyDirectionField } from '@/managers/collaborationAllowlistEntries';
import { deserializeCreateCollaborationWhitelistEntryRequestBodyDirectionField } from '@/managers/collaborationAllowlistEntries';
import { BoxClient } from '@/client';
import { CollaborationAllowlistEntries } from '@/schemas/collaborationAllowlistEntries';
import { CollaborationAllowlistEntry } from '@/schemas/collaborationAllowlistEntry';
import { CreateCollaborationWhitelistEntryRequestBody } from '@/managers/collaborationAllowlistEntries';
import { CreateCollaborationWhitelistEntryRequestBodyDirectionField } from '@/managers/collaborationAllowlistEntries';
import { getDefaultClient } from './commons';
import { getUuid } from '@/internal/utils';
import { toString } from '@/internal/utils';
import { sdToJson } from '@/serialization/json';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
export const client: BoxClient = getDefaultClient();
test('testCollaborationAllowlistEntries', async function testCollaborationAllowlistEntries(): Promise<any> {
  const allowlist: CollaborationAllowlistEntries =
    await client.collaborationAllowlistEntries.getCollaborationWhitelistEntries();
  if (!(allowlist.entries!.length >= 0)) {
    throw new Error('Assertion failed');
  }
  const domain: string = ''.concat(getUuid(), 'example.com') as string;
  const newEntry: CollaborationAllowlistEntry =
    await client.collaborationAllowlistEntries.createCollaborationWhitelistEntry(
      {
        direction:
          'inbound' as CreateCollaborationWhitelistEntryRequestBodyDirectionField,
        domain: domain,
      } satisfies CreateCollaborationWhitelistEntryRequestBody,
    );
  if (
    !((toString(newEntry.type) as string) == 'collaboration_whitelist_entry')
  ) {
    throw new Error('Assertion failed');
  }
  if (!((toString(newEntry.direction) as string) == 'inbound')) {
    throw new Error('Assertion failed');
  }
  if (!(newEntry.domain == domain)) {
    throw new Error('Assertion failed');
  }
  const entry: CollaborationAllowlistEntry =
    await client.collaborationAllowlistEntries.getCollaborationWhitelistEntryById(
      newEntry.id!,
    );
  if (!(entry.id == newEntry.id)) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(entry.direction) as string) ==
      (toString(newEntry.direction) as string)
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (!(entry.domain == domain)) {
    throw new Error('Assertion failed');
  }
  await client.collaborationAllowlistEntries.deleteCollaborationWhitelistEntryById(
    entry.id!,
  );
  await expect(async () => {
    await client.collaborationAllowlistEntries.getCollaborationWhitelistEntryById(
      entry.id!,
    );
  }).rejects.toThrow();
});
export {};
