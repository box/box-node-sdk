import { serializeSignTemplates } from '../schemas/signTemplates.generated.js';
import { deserializeSignTemplates } from '../schemas/signTemplates.generated.js';
import { serializeSignTemplate } from '../schemas/signTemplate.generated.js';
import { deserializeSignTemplate } from '../schemas/signTemplate.generated.js';
import { BoxClient } from '../client.generated.js';
import { SignTemplates } from '../schemas/signTemplates.generated.js';
import { GetSignTemplatesQueryParams } from '../managers/signTemplates.generated.js';
import { SignTemplate } from '../schemas/signTemplate.generated.js';
import { decodeBase64 } from '../internal/utils.js';
import { getEnvVar } from '../internal/utils.js';
import { getDefaultClientWithUserSubject } from './commons.generated.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
test('testGetSignTemplates', async function testGetSignTemplates(): Promise<any> {
  const client: BoxClient = getDefaultClientWithUserSubject(
    getEnvVar('USER_ID'),
  );
  const signTemplates: SignTemplates =
    await client.signTemplates.getSignTemplates({
      limit: 2,
    } satisfies GetSignTemplatesQueryParams);
  if (!(signTemplates.entries!.length >= 0)) {
    throw new Error('Assertion failed');
  }
});
test('testGetSignTemplate', async function testGetSignTemplate(): Promise<any> {
  const client: BoxClient = getDefaultClientWithUserSubject(
    getEnvVar('USER_ID'),
  );
  const signTemplates: SignTemplates =
    await client.signTemplates.getSignTemplates({
      limit: 2,
    } satisfies GetSignTemplatesQueryParams);
  if (!(signTemplates.entries!.length >= 0)) {
    throw new Error('Assertion failed');
  }
  if (signTemplates.entries!.length > 0) {
    const signTemplate: SignTemplate =
      await client.signTemplates.getSignTemplateById(
        signTemplates.entries![0].id!,
      );
    if (!(signTemplate.id == signTemplates.entries![0].id)) {
      throw new Error('Assertion failed');
    }
    if (!(signTemplate.sourceFiles!.length > 0)) {
      throw new Error('Assertion failed');
    }
    if (!!(signTemplate.name == '')) {
      throw new Error('Assertion failed');
    }
    if (!!(signTemplate.parentFolder!.id == '')) {
      throw new Error('Assertion failed');
    }
  }
});
export {};
