import { serializeCollaborationAllowlistExemptTargets } from '../schemas/collaborationAllowlistExemptTargets.generated.js';
import { deserializeCollaborationAllowlistExemptTargets } from '../schemas/collaborationAllowlistExemptTargets.generated.js';
import { serializeUserFull } from '../schemas/userFull.generated.js';
import { deserializeUserFull } from '../schemas/userFull.generated.js';
import { serializeCreateUserRequestBody } from '../managers/users.generated.js';
import { deserializeCreateUserRequestBody } from '../managers/users.generated.js';
import { serializeCollaborationAllowlistExemptTarget } from '../schemas/collaborationAllowlistExemptTarget.generated.js';
import { deserializeCollaborationAllowlistExemptTarget } from '../schemas/collaborationAllowlistExemptTarget.generated.js';
import { serializeCreateCollaborationWhitelistExemptTargetRequestBody } from '../managers/collaborationAllowlistExemptTargets.generated.js';
import { deserializeCreateCollaborationWhitelistExemptTargetRequestBody } from '../managers/collaborationAllowlistExemptTargets.generated.js';
import { serializeCreateCollaborationWhitelistExemptTargetRequestBodyUserField } from '../managers/collaborationAllowlistExemptTargets.generated.js';
import { deserializeCreateCollaborationWhitelistExemptTargetRequestBodyUserField } from '../managers/collaborationAllowlistExemptTargets.generated.js';
import { BoxClient } from '../client.generated.js';
import { CollaborationAllowlistExemptTargets } from '../schemas/collaborationAllowlistExemptTargets.generated.js';
import { UserFull } from '../schemas/userFull.generated.js';
import { CreateUserRequestBody } from '../managers/users.generated.js';
import { CollaborationAllowlistExemptTarget } from '../schemas/collaborationAllowlistExemptTarget.generated.js';
import { CreateCollaborationWhitelistExemptTargetRequestBody } from '../managers/collaborationAllowlistExemptTargets.generated.js';
import { CreateCollaborationWhitelistExemptTargetRequestBodyUserField } from '../managers/collaborationAllowlistExemptTargets.generated.js';
import { getUuid } from '../internal/utils.js';
import { getDefaultClient } from './commons.generated.js';
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
test('testCollaborationAllowlistExemptTargets', async function testCollaborationAllowlistExemptTargets(): Promise<any> {
  const exemptTargets: CollaborationAllowlistExemptTargets =
    await client.collaborationAllowlistExemptTargets.getCollaborationWhitelistExemptTargets();
  if (!(exemptTargets.entries!.length >= 0)) {
    throw new Error('Assertion failed');
  }
  const user: UserFull = await client.users.createUser({
    name: getUuid(),
    login: ''.concat(getUuid(), '@boxdemo.com') as string,
    isPlatformAccessOnly: true,
  } satisfies CreateUserRequestBody);
  const newExemptTarget: CollaborationAllowlistExemptTarget =
    await client.collaborationAllowlistExemptTargets.createCollaborationWhitelistExemptTarget(
      {
        user: {
          id: user.id,
        } satisfies CreateCollaborationWhitelistExemptTargetRequestBodyUserField,
      } satisfies CreateCollaborationWhitelistExemptTargetRequestBody,
    );
  if (
    !(
      (toString(newExemptTarget.type) as string) ==
      'collaboration_whitelist_exempt_target'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (!(newExemptTarget.user!.id == user.id)) {
    throw new Error('Assertion failed');
  }
  const exemptTarget: CollaborationAllowlistExemptTarget =
    await client.collaborationAllowlistExemptTargets.getCollaborationWhitelistExemptTargetById(
      newExemptTarget.id!,
    );
  if (!(exemptTarget.id == newExemptTarget.id)) {
    throw new Error('Assertion failed');
  }
  if (!(exemptTarget.user!.id == user.id)) {
    throw new Error('Assertion failed');
  }
  await client.collaborationAllowlistExemptTargets.deleteCollaborationWhitelistExemptTargetById(
    exemptTarget.id!,
  );
  await expect(async () => {
    await client.collaborationAllowlistExemptTargets.getCollaborationWhitelistExemptTargetById(
      exemptTarget.id!,
    );
  }).rejects.toThrow();
  await client.users.deleteUserById(user.id);
});
export {};
