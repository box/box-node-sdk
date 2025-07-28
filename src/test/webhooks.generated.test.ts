import { serializeFolderFull } from '../schemas/folderFull.generated.js';
import { deserializeFolderFull } from '../schemas/folderFull.generated.js';
import { serializeCreateFolderRequestBody } from '../managers/folders.generated.js';
import { deserializeCreateFolderRequestBody } from '../managers/folders.generated.js';
import { serializeCreateFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { deserializeCreateFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { serializeWebhook } from '../schemas/webhook.generated.js';
import { deserializeWebhook } from '../schemas/webhook.generated.js';
import { serializeCreateWebhookRequestBody } from '../managers/webhooks.generated.js';
import { deserializeCreateWebhookRequestBody } from '../managers/webhooks.generated.js';
import { serializeCreateWebhookRequestBodyTargetField } from '../managers/webhooks.generated.js';
import { deserializeCreateWebhookRequestBodyTargetField } from '../managers/webhooks.generated.js';
import { serializeCreateWebhookRequestBodyTargetTypeField } from '../managers/webhooks.generated.js';
import { deserializeCreateWebhookRequestBodyTargetTypeField } from '../managers/webhooks.generated.js';
import { serializeCreateWebhookRequestBodyTriggersField } from '../managers/webhooks.generated.js';
import { deserializeCreateWebhookRequestBodyTriggersField } from '../managers/webhooks.generated.js';
import { serializeWebhooks } from '../schemas/webhooks.generated.js';
import { deserializeWebhooks } from '../schemas/webhooks.generated.js';
import { serializeUpdateWebhookByIdRequestBody } from '../managers/webhooks.generated.js';
import { deserializeUpdateWebhookByIdRequestBody } from '../managers/webhooks.generated.js';
import { UpdateWebhookByIdOptionalsInput } from '../managers/webhooks.generated.js';
import { ValidateMessageOptionalsInput } from '../managers/webhooks.generated.js';
import { UpdateWebhookByIdOptionals } from '../managers/webhooks.generated.js';
import { ValidateMessageOptionals } from '../managers/webhooks.generated.js';
import { BoxClient } from '../client.generated.js';
import { FolderFull } from '../schemas/folderFull.generated.js';
import { CreateFolderRequestBody } from '../managers/folders.generated.js';
import { CreateFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { Webhook } from '../schemas/webhook.generated.js';
import { CreateWebhookRequestBody } from '../managers/webhooks.generated.js';
import { CreateWebhookRequestBodyTargetField } from '../managers/webhooks.generated.js';
import { CreateWebhookRequestBodyTargetTypeField } from '../managers/webhooks.generated.js';
import { CreateWebhookRequestBodyTriggersField } from '../managers/webhooks.generated.js';
import { Webhooks } from '../schemas/webhooks.generated.js';
import { UpdateWebhookByIdRequestBody } from '../managers/webhooks.generated.js';
import { getUuid } from '../internal/utils.js';
import { dateTimeToString } from '../internal/utils.js';
import { epochSecondsToDateTime } from '../internal/utils.js';
import { getEpochTimeInSeconds } from '../internal/utils.js';
import { computeWebhookSignature } from '../internal/utils.js';
import { compareSignatures } from '../internal/utils.js';
import { WebhooksManager } from '../managers/webhooks.generated.js';
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
test('testWebhooksCRUD', async function testWebhooksCRUD(): Promise<any> {
  const folder: FolderFull = await client.folders.createFolder({
    name: getUuid(),
    parent: { id: '0' } satisfies CreateFolderRequestBodyParentField,
  } satisfies CreateFolderRequestBody);
  const webhook: Webhook = await client.webhooks.createWebhook({
    target: {
      id: folder.id,
      type: 'folder' as CreateWebhookRequestBodyTargetTypeField,
    } satisfies CreateWebhookRequestBodyTargetField,
    address: 'https://example.com/new-webhook',
    triggers: ['FILE.UPLOADED' as CreateWebhookRequestBodyTriggersField],
  } satisfies CreateWebhookRequestBody);
  if (!(webhook.target!.id == folder.id)) {
    throw new Error('Assertion failed');
  }
  if (!((toString(webhook.target!.type) as string) == 'folder')) {
    throw new Error('Assertion failed');
  }
  if (!(webhook.triggers!.length == ['FILE.UPLOADED'].length)) {
    throw new Error('Assertion failed');
  }
  if (!(webhook.address == 'https://example.com/new-webhook')) {
    throw new Error('Assertion failed');
  }
  const webhooks: Webhooks = await client.webhooks.getWebhooks();
  if (!(webhooks.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
  const webhookFromApi: Webhook = await client.webhooks.getWebhookById(
    webhook.id!,
  );
  if (!(webhook.id == webhookFromApi.id)) {
    throw new Error('Assertion failed');
  }
  if (!(webhook.target!.id == webhookFromApi.target!.id)) {
    throw new Error('Assertion failed');
  }
  if (!(webhook.address == webhookFromApi.address)) {
    throw new Error('Assertion failed');
  }
  const updatedWebhook: Webhook = await client.webhooks.updateWebhookById(
    webhook.id!,
    {
      requestBody: {
        address: 'https://example.com/updated-webhook',
      } satisfies UpdateWebhookByIdRequestBody,
    } satisfies UpdateWebhookByIdOptionalsInput,
  );
  if (!(updatedWebhook.id == webhook.id)) {
    throw new Error('Assertion failed');
  }
  if (!(updatedWebhook.address == 'https://example.com/updated-webhook')) {
    throw new Error('Assertion failed');
  }
  await client.webhooks.deleteWebhookById(webhook.id!);
  await expect(async () => {
    await client.webhooks.deleteWebhookById(webhook.id!);
  }).rejects.toThrow();
  await client.folders.deleteFolderById(folder.id);
});
test('testWebhookValidation', async function testWebhookValidation(): Promise<any> {
  const primaryKey: string = 'SamplePrimaryKey';
  const secondaryKey: string = 'SampleSecondaryKey';
  const incorrectKey: string = 'IncorrectKey';
  const body: string =
    '{"type":"webhook_event","webhook":{"id":"1234567890"},"trigger":"FILE.UPLOADED","source":{"id":"1234567890","type":"file","name":"Test.txt"}}';
  const bodyWithJapanese: string =
    '{"webhook":{"id":"1234567890"},"trigger":"FILE.UPLOADED","source":{"id":"1234567890","type":"file","name":"\u30B9\u30AF\u30EA\u30FC\u30F3\u30B7\u30E7\u30C3\u30C8 2020-08-05.txt"}}';
  const bodyWithEmoji: string =
    '{"webhook":{"id":"1234567890"},"trigger":"FILE.UPLOADED","source":{"id":"1234567890","type":"file","name":"\uD83D\uDE00 2020-08-05.txt"}}';
  const bodyWithCarriageReturn: string =
    '{"webhook":{"id":"1234567890"},"trigger":"FILE.UPLOADED","source":{"id":"1234567890","type":"file","name":"test \\r"}}';
  const bodyWithForwardSlash: string =
    '{"webhook":{"id":"1234567890"},"trigger":"FILE.UPLOADED","source":{"id":"1234567890","type":"file","name":"\\/"}}';
  const bodyWithBackSlash: string =
    '{"webhook":{"id":"1234567890"},"trigger":"FILE.UPLOADED","source":{"id":"1234567890","type":"file","name":"\\\\"}}';
  const headers: {
    readonly [key: string]: string;
  } = {
    ['box-delivery-id']: 'f96bb54b-ee16-4fc5-aa65-8c2d9e5b546f',
    ['box-delivery-timestamp']: '2020-01-01T00:00:00-07:00',
    ['box-signature-algorithm']: 'HmacSHA256',
    ['box-signature-primary']: '6TfeAW3A1PASkgboxxA5yqHNKOwFyMWuEXny/FPD5hI=',
    ['box-signature-secondary']: 'v+1CD1Jdo3muIcbpv5lxxgPglOqMfsNHPV899xWYydo=',
    ['box-signature-version']: '1',
  };
  const headersWithJapanese: {
    readonly [key: string]: string;
  } = {
    ...headers,
    ...{
      ['box-signature-primary']: 'LV2uCu+5NJtIHrCXDYgZ0v/PP5THGRuegw3RtdnEyuE=',
    },
  };
  const headersWithEmoji: {
    readonly [key: string]: string;
  } = {
    ...headers,
    ...{
      ['box-signature-primary']: 'xF/SDZosX4le+v4A0Qn59sZhuD1RqY5KRUKzVMSbh0E=',
    },
  };
  const headersWithCarriageReturn: {
    readonly [key: string]: string;
  } = {
    ...headers,
    ...{
      ['box-signature-primary']: 'SVkbKgy3dEEf2PbbzpNu2lDZS7zZ/aboU7HOZgBGrJk=',
    },
  };
  const headersWithForwardSlash: {
    readonly [key: string]: string;
  } = {
    ...headers,
    ...{
      ['box-signature-primary']: 't41PWT5ZB6OcysnD6SDy9Ud+p9hdXxIdXqcdweyZv/Q=',
    },
  };
  const headersWithBackSlash: {
    readonly [key: string]: string;
  } = {
    ...headers,
    ...{
      ['box-signature-primary']: 'ERpMZwUQsGDTfj82ehdX6VvDZfvOhK5ULNfVmwVAGe0=',
    },
  };
  const currentDatetime: string = dateTimeToString(
    epochSecondsToDateTime(getEpochTimeInSeconds()),
  );
  const futureDatetime: string = dateTimeToString(
    epochSecondsToDateTime(getEpochTimeInSeconds() + 1200),
  );
  const pastDatetime: string = dateTimeToString(
    epochSecondsToDateTime(getEpochTimeInSeconds() - 1200),
  );
  const headersWithCorrectDatetime: {
    readonly [key: string]: string;
  } = {
    ...headers,
    ...{
      ['box-delivery-timestamp']: currentDatetime,
      ['box-signature-primary']: (await computeWebhookSignature(
        body,
        { ...headers, ...{ ['box-delivery-timestamp']: currentDatetime } },
        primaryKey,
        true,
      ))!,
      ['box-signature-secondary']: (await computeWebhookSignature(
        body,
        { ...headers, ...{ ['box-delivery-timestamp']: currentDatetime } },
        secondaryKey,
        true,
      ))!,
    },
  };
  const headersWithJapaneseWithCorrectDatetime: {
    readonly [key: string]: string;
  } = {
    ...headersWithJapanese,
    ...{
      ['box-delivery-timestamp']: currentDatetime,
      ['box-signature-primary']: (await computeWebhookSignature(
        bodyWithJapanese,
        {
          ...headersWithJapanese,
          ...{ ['box-delivery-timestamp']: currentDatetime },
        },
        primaryKey,
        true,
      ))!,
      ['box-signature-secondary']: (await computeWebhookSignature(
        bodyWithJapanese,
        {
          ...headersWithJapanese,
          ...{ ['box-delivery-timestamp']: currentDatetime },
        },
        secondaryKey,
        true,
      ))!,
    },
  };
  const headersWithFutureDatetime: {
    readonly [key: string]: string;
  } = {
    ...headers,
    ...{
      ['box-delivery-timestamp']: futureDatetime,
      ['box-signature-primary']: (await computeWebhookSignature(
        body,
        { ...headers, ...{ ['box-delivery-timestamp']: futureDatetime } },
        primaryKey,
        true,
      ))!,
      ['box-signature-secondary']: (await computeWebhookSignature(
        body,
        { ...headers, ...{ ['box-delivery-timestamp']: futureDatetime } },
        secondaryKey,
        true,
      ))!,
    },
  };
  const headersWithPastDatetime: {
    readonly [key: string]: string;
  } = {
    ...headers,
    ...{
      ['box-delivery-timestamp']: pastDatetime,
      ['box-signature-primary']: (await computeWebhookSignature(
        body,
        { ...headers, ...{ ['box-delivery-timestamp']: pastDatetime } },
        primaryKey,
        true,
      ))!,
      ['box-signature-secondary']: (await computeWebhookSignature(
        body,
        { ...headers, ...{ ['box-delivery-timestamp']: pastDatetime } },
        secondaryKey,
        true,
      ))!,
    },
  };
  const headersWithWrongSignatureVersion: {
    readonly [key: string]: string;
  } = { ...headers, ...{ ['box-signature-version']: '2' } };
  const headersWithWrongSignatureAlgorithm: {
    readonly [key: string]: string;
  } = { ...headers, ...{ ['box-signature-algorithm']: 'HmacSHA1' } };
  if (
    !(await compareSignatures(
      await computeWebhookSignature(body, headers, primaryKey, true),
      headers['box-signature-primary'],
    ))
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(await compareSignatures(
      await computeWebhookSignature(body, headers, secondaryKey, true),
      headers['box-signature-secondary'],
    ))
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !!(await compareSignatures(
      await computeWebhookSignature(body, headers, incorrectKey, true),
      headers['box-signature-primary'],
    ))
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(await compareSignatures(
      await computeWebhookSignature(
        bodyWithJapanese,
        headersWithJapanese,
        primaryKey,
        true,
      ),
      headersWithJapanese['box-signature-primary'],
    ))
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(await compareSignatures(
      await computeWebhookSignature(
        bodyWithEmoji,
        headersWithEmoji,
        primaryKey,
        true,
      ),
      headersWithEmoji['box-signature-primary'],
    ))
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(await compareSignatures(
      await computeWebhookSignature(
        bodyWithCarriageReturn,
        headersWithCarriageReturn,
        primaryKey,
        true,
      ),
      headersWithCarriageReturn['box-signature-primary'],
    ))
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(await compareSignatures(
      await computeWebhookSignature(
        bodyWithForwardSlash,
        headersWithForwardSlash,
        primaryKey,
        true,
      ),
      headersWithForwardSlash['box-signature-primary'],
    ))
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(await compareSignatures(
      await computeWebhookSignature(
        bodyWithBackSlash,
        headersWithBackSlash,
        primaryKey,
        true,
      ),
      headersWithBackSlash['box-signature-primary'],
    ))
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(await WebhooksManager.validateMessage(
      body,
      headersWithCorrectDatetime,
      primaryKey,
      { secondaryKey: secondaryKey } satisfies ValidateMessageOptionalsInput,
    ))
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(await WebhooksManager.validateMessage(
      body,
      headersWithCorrectDatetime,
      primaryKey,
      { secondaryKey: incorrectKey } satisfies ValidateMessageOptionalsInput,
    ))
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(await WebhooksManager.validateMessage(
      body,
      headersWithCorrectDatetime,
      incorrectKey,
      { secondaryKey: secondaryKey } satisfies ValidateMessageOptionalsInput,
    ))
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !!(await WebhooksManager.validateMessage(
      body,
      headersWithCorrectDatetime,
      incorrectKey,
      { secondaryKey: incorrectKey } satisfies ValidateMessageOptionalsInput,
    ))
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !!(await WebhooksManager.validateMessage(
      body,
      headersWithFutureDatetime,
      primaryKey,
      { secondaryKey: secondaryKey } satisfies ValidateMessageOptionalsInput,
    ))
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !!(await WebhooksManager.validateMessage(
      body,
      headersWithPastDatetime,
      primaryKey,
      { secondaryKey: secondaryKey } satisfies ValidateMessageOptionalsInput,
    ))
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !!(await WebhooksManager.validateMessage(
      body,
      headersWithWrongSignatureVersion,
      primaryKey,
      { secondaryKey: secondaryKey } satisfies ValidateMessageOptionalsInput,
    ))
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !!(await WebhooksManager.validateMessage(
      body,
      headersWithWrongSignatureAlgorithm,
      primaryKey,
      { secondaryKey: secondaryKey } satisfies ValidateMessageOptionalsInput,
    ))
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(await WebhooksManager.validateMessage(
      bodyWithJapanese,
      headersWithJapaneseWithCorrectDatetime,
      primaryKey,
      { secondaryKey: secondaryKey } satisfies ValidateMessageOptionalsInput,
    ))
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(await WebhooksManager.validateMessage(
      bodyWithJapanese,
      headersWithJapaneseWithCorrectDatetime,
      primaryKey,
      { secondaryKey: incorrectKey } satisfies ValidateMessageOptionalsInput,
    ))
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(await WebhooksManager.validateMessage(
      bodyWithJapanese,
      headersWithJapaneseWithCorrectDatetime,
      incorrectKey,
      { secondaryKey: secondaryKey } satisfies ValidateMessageOptionalsInput,
    ))
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !!(await WebhooksManager.validateMessage(
      bodyWithJapanese,
      headersWithJapanese,
      primaryKey,
      { secondaryKey: secondaryKey } satisfies ValidateMessageOptionalsInput,
    ))
  ) {
    throw new Error('Assertion failed');
  }
});
export {};
