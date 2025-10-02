import { serializeTermsOfService } from '@/schemas/termsOfService';
import { deserializeTermsOfService } from '@/schemas/termsOfService';
import { serializeUpdateTermsOfServiceByIdRequestBody } from '@/managers/termsOfServices';
import { deserializeUpdateTermsOfServiceByIdRequestBody } from '@/managers/termsOfServices';
import { serializeUpdateTermsOfServiceByIdRequestBodyStatusField } from '@/managers/termsOfServices';
import { deserializeUpdateTermsOfServiceByIdRequestBodyStatusField } from '@/managers/termsOfServices';
import { serializeTermsOfServices } from '@/schemas/termsOfServices';
import { deserializeTermsOfServices } from '@/schemas/termsOfServices';
import { BoxClient } from '@/client';
import { TermsOfService } from '@/schemas/termsOfService';
import { UpdateTermsOfServiceByIdRequestBody } from '@/managers/termsOfServices';
import { UpdateTermsOfServiceByIdRequestBodyStatusField } from '@/managers/termsOfServices';
import { TermsOfServices } from '@/schemas/termsOfServices';
import { getDefaultClient } from './commons';
import { getOrCreateTermsOfServices } from './commons';
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
test('testGetTermsOfServices', async function testGetTermsOfServices(): Promise<any> {
  const tos: TermsOfService = await getOrCreateTermsOfServices();
  const updatedTos1: TermsOfService =
    await client.termsOfServices.updateTermsOfServiceById(tos.id, {
      status: 'disabled' as UpdateTermsOfServiceByIdRequestBodyStatusField,
      text: 'TOS',
    } satisfies UpdateTermsOfServiceByIdRequestBody);
  if (!((toString(updatedTos1.status) as string) == 'disabled')) {
    throw new Error('Assertion failed');
  }
  if (!(updatedTos1.text == 'TOS')) {
    throw new Error('Assertion failed');
  }
  const updatedTos2: TermsOfService =
    await client.termsOfServices.updateTermsOfServiceById(tos.id, {
      status: 'disabled' as UpdateTermsOfServiceByIdRequestBodyStatusField,
      text: 'Updated TOS',
    } satisfies UpdateTermsOfServiceByIdRequestBody);
  if (!((toString(updatedTos2.status) as string) == 'disabled')) {
    throw new Error('Assertion failed');
  }
  if (!(updatedTos2.text == 'Updated TOS')) {
    throw new Error('Assertion failed');
  }
  const listTos: TermsOfServices =
    await client.termsOfServices.getTermsOfService();
  if (!(listTos.totalCount! > 0)) {
    throw new Error('Assertion failed');
  }
});
export {};
