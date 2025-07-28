import { serializeCollaborationAllowlistEntries } from '../schemas/collaborationAllowlistEntries.generated.js';
import { deserializeCollaborationAllowlistEntries } from '../schemas/collaborationAllowlistEntries.generated.js';
import { serializeCollaborationAllowlistEntry } from '../schemas/collaborationAllowlistEntry.generated.js';
import { deserializeCollaborationAllowlistEntry } from '../schemas/collaborationAllowlistEntry.generated.js';
import { serializeCreateCollaborationWhitelistEntryRequestBody } from '../managers/collaborationAllowlistEntries.generated.js';
import { deserializeCreateCollaborationWhitelistEntryRequestBody } from '../managers/collaborationAllowlistEntries.generated.js';
import { serializeCreateCollaborationWhitelistEntryRequestBodyDirectionField } from '../managers/collaborationAllowlistEntries.generated.js';
import { deserializeCreateCollaborationWhitelistEntryRequestBodyDirectionField } from '../managers/collaborationAllowlistEntries.generated.js';
import { BoxClient } from '../client.generated.js';
import { CollaborationAllowlistEntries } from '../schemas/collaborationAllowlistEntries.generated.js';
import { CollaborationAllowlistEntry } from '../schemas/collaborationAllowlistEntry.generated.js';
import { CreateCollaborationWhitelistEntryRequestBody } from '../managers/collaborationAllowlistEntries.generated.js';
import { CreateCollaborationWhitelistEntryRequestBodyDirectionField } from '../managers/collaborationAllowlistEntries.generated.js';
import { getDefaultClient } from './commons.generated.js';
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
