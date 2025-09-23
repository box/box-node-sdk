import { serializeTermsOfService } from '../schemas/termsOfService.js';
import { deserializeTermsOfService } from '../schemas/termsOfService.js';
import { serializeUserFull } from '../schemas/userFull.js';
import { deserializeUserFull } from '../schemas/userFull.js';
import { serializeCreateUserRequestBody } from '../managers/users.js';
import { deserializeCreateUserRequestBody } from '../managers/users.js';
import { serializeTermsOfServiceUserStatus } from '../schemas/termsOfServiceUserStatus.js';
import { deserializeTermsOfServiceUserStatus } from '../schemas/termsOfServiceUserStatus.js';
import { serializeCreateTermsOfServiceStatusForUserRequestBody } from '../managers/termsOfServiceUserStatuses.js';
import { deserializeCreateTermsOfServiceStatusForUserRequestBody } from '../managers/termsOfServiceUserStatuses.js';
import { serializeCreateTermsOfServiceStatusForUserRequestBodyTosField } from '../managers/termsOfServiceUserStatuses.js';
import { deserializeCreateTermsOfServiceStatusForUserRequestBodyTosField } from '../managers/termsOfServiceUserStatuses.js';
import { serializeCreateTermsOfServiceStatusForUserRequestBodyUserField } from '../managers/termsOfServiceUserStatuses.js';
import { deserializeCreateTermsOfServiceStatusForUserRequestBodyUserField } from '../managers/termsOfServiceUserStatuses.js';
import { serializeUpdateTermsOfServiceStatusForUserByIdRequestBody } from '../managers/termsOfServiceUserStatuses.js';
import { deserializeUpdateTermsOfServiceStatusForUserByIdRequestBody } from '../managers/termsOfServiceUserStatuses.js';
import { serializeTermsOfServiceUserStatuses } from '../schemas/termsOfServiceUserStatuses.js';
import { deserializeTermsOfServiceUserStatuses } from '../schemas/termsOfServiceUserStatuses.js';
import { BoxClient } from '../client.js';
import { TermsOfService } from '../schemas/termsOfService.js';
import { UserFull } from '../schemas/userFull.js';
import { CreateUserRequestBody } from '../managers/users.js';
import { TermsOfServiceUserStatus } from '../schemas/termsOfServiceUserStatus.js';
import { CreateTermsOfServiceStatusForUserRequestBody } from '../managers/termsOfServiceUserStatuses.js';
import { CreateTermsOfServiceStatusForUserRequestBodyTosField } from '../managers/termsOfServiceUserStatuses.js';
import { CreateTermsOfServiceStatusForUserRequestBodyUserField } from '../managers/termsOfServiceUserStatuses.js';
import { UpdateTermsOfServiceStatusForUserByIdRequestBody } from '../managers/termsOfServiceUserStatuses.js';
import { TermsOfServiceUserStatuses } from '../schemas/termsOfServiceUserStatuses.js';
import { GetTermsOfServiceUserStatusesQueryParams } from '../managers/termsOfServiceUserStatuses.js';
import { getDefaultClientWithUserSubject } from './commons.js';
import { getOrCreateTermsOfServices } from './commons.js';
import { getUuid } from '../internal/utils.js';
import { getEnvVar } from '../internal/utils.js';
import { toString } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
test('testGetTermsOfServiceUserStatuses', async function testGetTermsOfServiceUserStatuses(): Promise<any> {
  const adminUserId: string = getEnvVar('USER_ID');
  const client: BoxClient = getDefaultClientWithUserSubject(adminUserId);
  const tos: TermsOfService = await getOrCreateTermsOfServices();
  const user: UserFull = await client.users.createUser({
    name: getUuid(),
    login: ''.concat(getUuid(), '@boxdemo.com') as string,
    isPlatformAccessOnly: true,
  } satisfies CreateUserRequestBody);
  const createdTosUserStatus: TermsOfServiceUserStatus =
    await client.termsOfServiceUserStatuses.createTermsOfServiceStatusForUser({
      tos: new CreateTermsOfServiceStatusForUserRequestBodyTosField({
        id: tos.id,
      }),
      user: new CreateTermsOfServiceStatusForUserRequestBodyUserField({
        id: user.id,
      }),
      isAccepted: false,
    } satisfies CreateTermsOfServiceStatusForUserRequestBody);
  if (!(createdTosUserStatus.isAccepted == false)) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(createdTosUserStatus.type) as string) ==
      'terms_of_service_user_status'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(createdTosUserStatus.tos!.type) as string) == 'terms_of_service'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (!((toString(createdTosUserStatus.user!.type) as string) == 'user')) {
    throw new Error('Assertion failed');
  }
  if (!(createdTosUserStatus.tos!.id == tos.id)) {
    throw new Error('Assertion failed');
  }
  if (!(createdTosUserStatus.user!.id == user.id)) {
    throw new Error('Assertion failed');
  }
  const updatedTosUserStatus: TermsOfServiceUserStatus =
    await client.termsOfServiceUserStatuses.updateTermsOfServiceStatusForUserById(
      createdTosUserStatus.id,
      {
        isAccepted: true,
      } satisfies UpdateTermsOfServiceStatusForUserByIdRequestBody,
    );
  if (!(updatedTosUserStatus.isAccepted == true)) {
    throw new Error('Assertion failed');
  }
  const listTosUserStatuses: TermsOfServiceUserStatuses =
    await client.termsOfServiceUserStatuses.getTermsOfServiceUserStatuses({
      tosId: tos.id,
      userId: user.id,
    } satisfies GetTermsOfServiceUserStatusesQueryParams);
  if (!(listTosUserStatuses.totalCount! > 0)) {
    throw new Error('Assertion failed');
  }
  await client.users.deleteUserById(user.id);
});
export {};
