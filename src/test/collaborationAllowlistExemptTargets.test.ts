import { serializeCollaborationAllowlistExemptTargets } from '@/schemas/collaborationAllowlistExemptTargets';
import { deserializeCollaborationAllowlistExemptTargets } from '@/schemas/collaborationAllowlistExemptTargets';
import { serializeUserFull } from '@/schemas/userFull';
import { deserializeUserFull } from '@/schemas/userFull';
import { serializeCreateUserRequestBody } from '@/managers/users';
import { deserializeCreateUserRequestBody } from '@/managers/users';
import { serializeCollaborationAllowlistExemptTarget } from '@/schemas/collaborationAllowlistExemptTarget';
import { deserializeCollaborationAllowlistExemptTarget } from '@/schemas/collaborationAllowlistExemptTarget';
import { serializeCreateCollaborationWhitelistExemptTargetRequestBody } from '@/managers/collaborationAllowlistExemptTargets';
import { deserializeCreateCollaborationWhitelistExemptTargetRequestBody } from '@/managers/collaborationAllowlistExemptTargets';
import { serializeCreateCollaborationWhitelistExemptTargetRequestBodyUserField } from '@/managers/collaborationAllowlistExemptTargets';
import { deserializeCreateCollaborationWhitelistExemptTargetRequestBodyUserField } from '@/managers/collaborationAllowlistExemptTargets';
import { BoxClient } from '@/client';
import { CollaborationAllowlistExemptTargets } from '@/schemas/collaborationAllowlistExemptTargets';
import { UserFull } from '@/schemas/userFull';
import { CreateUserRequestBody } from '@/managers/users';
import { CollaborationAllowlistExemptTarget } from '@/schemas/collaborationAllowlistExemptTarget';
import { CreateCollaborationWhitelistExemptTargetRequestBody } from '@/managers/collaborationAllowlistExemptTargets';
import { CreateCollaborationWhitelistExemptTargetRequestBodyUserField } from '@/managers/collaborationAllowlistExemptTargets';
import { getUuid } from '@/internal/utils';
import { getDefaultClient } from './commons';
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
