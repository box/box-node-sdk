import { serializeTermsOfService } from '../schemas/termsOfService.generated.js';
import { deserializeTermsOfService } from '../schemas/termsOfService.generated.js';
import { serializeUserFull } from '../schemas/userFull.generated.js';
import { deserializeUserFull } from '../schemas/userFull.generated.js';
import { serializeCreateUserRequestBody } from '../managers/users.generated.js';
import { deserializeCreateUserRequestBody } from '../managers/users.generated.js';
import { serializeTermsOfServiceUserStatus } from '../schemas/termsOfServiceUserStatus.generated.js';
import { deserializeTermsOfServiceUserStatus } from '../schemas/termsOfServiceUserStatus.generated.js';
import { serializeCreateTermsOfServiceStatusForUserRequestBody } from '../managers/termsOfServiceUserStatuses.generated.js';
import { deserializeCreateTermsOfServiceStatusForUserRequestBody } from '../managers/termsOfServiceUserStatuses.generated.js';
import { serializeCreateTermsOfServiceStatusForUserRequestBodyTosField } from '../managers/termsOfServiceUserStatuses.generated.js';
import { deserializeCreateTermsOfServiceStatusForUserRequestBodyTosField } from '../managers/termsOfServiceUserStatuses.generated.js';
import { serializeCreateTermsOfServiceStatusForUserRequestBodyUserField } from '../managers/termsOfServiceUserStatuses.generated.js';
import { deserializeCreateTermsOfServiceStatusForUserRequestBodyUserField } from '../managers/termsOfServiceUserStatuses.generated.js';
import { serializeUpdateTermsOfServiceStatusForUserByIdRequestBody } from '../managers/termsOfServiceUserStatuses.generated.js';
import { deserializeUpdateTermsOfServiceStatusForUserByIdRequestBody } from '../managers/termsOfServiceUserStatuses.generated.js';
import { serializeTermsOfServiceUserStatuses } from '../schemas/termsOfServiceUserStatuses.generated.js';
import { deserializeTermsOfServiceUserStatuses } from '../schemas/termsOfServiceUserStatuses.generated.js';
import { BoxClient } from '../client.generated.js';
import { TermsOfService } from '../schemas/termsOfService.generated.js';
import { UserFull } from '../schemas/userFull.generated.js';
import { CreateUserRequestBody } from '../managers/users.generated.js';
import { TermsOfServiceUserStatus } from '../schemas/termsOfServiceUserStatus.generated.js';
import { CreateTermsOfServiceStatusForUserRequestBody } from '../managers/termsOfServiceUserStatuses.generated.js';
import { CreateTermsOfServiceStatusForUserRequestBodyTosField } from '../managers/termsOfServiceUserStatuses.generated.js';
import { CreateTermsOfServiceStatusForUserRequestBodyUserField } from '../managers/termsOfServiceUserStatuses.generated.js';
import { UpdateTermsOfServiceStatusForUserByIdRequestBody } from '../managers/termsOfServiceUserStatuses.generated.js';
import { TermsOfServiceUserStatuses } from '../schemas/termsOfServiceUserStatuses.generated.js';
import { GetTermsOfServiceUserStatusesQueryParams } from '../managers/termsOfServiceUserStatuses.generated.js';
import { getDefaultClientWithUserSubject } from './commons.generated.js';
import { getOrCreateTermsOfServices } from './commons.generated.js';
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
