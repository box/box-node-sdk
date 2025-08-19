import { serializeTermsOfService } from '../schemas/termsOfService.js';
import { deserializeTermsOfService } from '../schemas/termsOfService.js';
import { serializeUpdateTermsOfServiceByIdRequestBody } from '../managers/termsOfServices.js';
import { deserializeUpdateTermsOfServiceByIdRequestBody } from '../managers/termsOfServices.js';
import { serializeUpdateTermsOfServiceByIdRequestBodyStatusField } from '../managers/termsOfServices.js';
import { deserializeUpdateTermsOfServiceByIdRequestBodyStatusField } from '../managers/termsOfServices.js';
import { serializeTermsOfServices } from '../schemas/termsOfServices.js';
import { deserializeTermsOfServices } from '../schemas/termsOfServices.js';
import { BoxClient } from '../client.js';
import { TermsOfService } from '../schemas/termsOfService.js';
import { UpdateTermsOfServiceByIdRequestBody } from '../managers/termsOfServices.js';
import { UpdateTermsOfServiceByIdRequestBodyStatusField } from '../managers/termsOfServices.js';
import { TermsOfServices } from '../schemas/termsOfServices.js';
import { getDefaultClient } from './commons.js';
import { getOrCreateTermsOfServices } from './commons.js';
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
