import { serializeTermsOfService } from '@/schemas/termsOfService';
import { deserializeTermsOfService } from '@/schemas/termsOfService';
import { serializeUserFull } from '@/schemas/userFull';
import { deserializeUserFull } from '@/schemas/userFull';
import { serializeCreateUserRequestBody } from '@/managers/users';
import { deserializeCreateUserRequestBody } from '@/managers/users';
import { serializeTermsOfServiceUserStatus } from '@/schemas/termsOfServiceUserStatus';
import { deserializeTermsOfServiceUserStatus } from '@/schemas/termsOfServiceUserStatus';
import { serializeCreateTermsOfServiceStatusForUserRequestBody } from '@/managers/termsOfServiceUserStatuses';
import { deserializeCreateTermsOfServiceStatusForUserRequestBody } from '@/managers/termsOfServiceUserStatuses';
import { serializeCreateTermsOfServiceStatusForUserRequestBodyTosField } from '@/managers/termsOfServiceUserStatuses';
import { deserializeCreateTermsOfServiceStatusForUserRequestBodyTosField } from '@/managers/termsOfServiceUserStatuses';
import { serializeCreateTermsOfServiceStatusForUserRequestBodyUserField } from '@/managers/termsOfServiceUserStatuses';
import { deserializeCreateTermsOfServiceStatusForUserRequestBodyUserField } from '@/managers/termsOfServiceUserStatuses';
import { serializeUpdateTermsOfServiceStatusForUserByIdRequestBody } from '@/managers/termsOfServiceUserStatuses';
import { deserializeUpdateTermsOfServiceStatusForUserByIdRequestBody } from '@/managers/termsOfServiceUserStatuses';
import { serializeTermsOfServiceUserStatuses } from '@/schemas/termsOfServiceUserStatuses';
import { deserializeTermsOfServiceUserStatuses } from '@/schemas/termsOfServiceUserStatuses';
import { BoxClient } from '@/client';
import { TermsOfService } from '@/schemas/termsOfService';
import { UserFull } from '@/schemas/userFull';
import { CreateUserRequestBody } from '@/managers/users';
import { TermsOfServiceUserStatus } from '@/schemas/termsOfServiceUserStatus';
import { CreateTermsOfServiceStatusForUserRequestBody } from '@/managers/termsOfServiceUserStatuses';
import { CreateTermsOfServiceStatusForUserRequestBodyTosField } from '@/managers/termsOfServiceUserStatuses';
import { CreateTermsOfServiceStatusForUserRequestBodyUserField } from '@/managers/termsOfServiceUserStatuses';
import { UpdateTermsOfServiceStatusForUserByIdRequestBody } from '@/managers/termsOfServiceUserStatuses';
import { TermsOfServiceUserStatuses } from '@/schemas/termsOfServiceUserStatuses';
import { GetTermsOfServiceUserStatusesQueryParams } from '@/managers/termsOfServiceUserStatuses';
import { getDefaultClientWithUserSubject } from './commons';
import { getOrCreateTermsOfServices } from './commons';
import { getUuid } from '@/internal/utils';
import { getEnvVar } from '@/internal/utils';
import { toString } from '@/internal/utils';
import { sdToJson } from '@/serialization/json';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
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
