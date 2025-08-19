import { serializeCollaborationAllowlistEntries } from '../schemas/collaborationAllowlistEntries.js';
import { deserializeCollaborationAllowlistEntries } from '../schemas/collaborationAllowlistEntries.js';
import { serializeCollaborationAllowlistEntry } from '../schemas/collaborationAllowlistEntry.js';
import { deserializeCollaborationAllowlistEntry } from '../schemas/collaborationAllowlistEntry.js';
import { serializeCreateCollaborationWhitelistEntryRequestBody } from '../managers/collaborationAllowlistEntries.js';
import { deserializeCreateCollaborationWhitelistEntryRequestBody } from '../managers/collaborationAllowlistEntries.js';
import { serializeCreateCollaborationWhitelistEntryRequestBodyDirectionField } from '../managers/collaborationAllowlistEntries.js';
import { deserializeCreateCollaborationWhitelistEntryRequestBodyDirectionField } from '../managers/collaborationAllowlistEntries.js';
import { BoxClient } from '../client.js';
import { CollaborationAllowlistEntries } from '../schemas/collaborationAllowlistEntries.js';
import { CollaborationAllowlistEntry } from '../schemas/collaborationAllowlistEntry.js';
import { CreateCollaborationWhitelistEntryRequestBody } from '../managers/collaborationAllowlistEntries.js';
import { CreateCollaborationWhitelistEntryRequestBodyDirectionField } from '../managers/collaborationAllowlistEntries.js';
import { getDefaultClient } from './commons.js';
import { getUuid } from '../internal/utils.js';
import { toString } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
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
