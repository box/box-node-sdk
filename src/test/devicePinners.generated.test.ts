import { serializeDevicePinners } from '../schemas/devicePinners.generated.js';
import { deserializeDevicePinners } from '../schemas/devicePinners.generated.js';
import { serializeGetEnterpriseDevicePinnersQueryParamsDirectionField } from '../managers/devicePinners.generated.js';
import { deserializeGetEnterpriseDevicePinnersQueryParamsDirectionField } from '../managers/devicePinners.generated.js';
import { GetEnterpriseDevicePinnersOptionalsInput } from '../managers/devicePinners.generated.js';
import { GetEnterpriseDevicePinnersOptionals } from '../managers/devicePinners.generated.js';
import { BoxClient } from '../client.generated.js';
import { DevicePinners } from '../schemas/devicePinners.generated.js';
import { GetEnterpriseDevicePinnersQueryParams } from '../managers/devicePinners.generated.js';
import { GetEnterpriseDevicePinnersQueryParamsDirectionField } from '../managers/devicePinners.generated.js';
import { getDefaultClient } from './commons.generated.js';
import { getEnvVar } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const client: BoxClient = getDefaultClient();
test('testDevicePinners', async function testDevicePinners(): Promise<any> {
  const enterpriseId: string = getEnvVar('ENTERPRISE_ID');
  const devicePinners: DevicePinners =
    await client.devicePinners.getEnterpriseDevicePinners(enterpriseId);
  if (!(devicePinners.entries!.length >= 0)) {
    throw new Error('Assertion failed');
  }
  const devicePinnersInDescDirection: DevicePinners =
    await client.devicePinners.getEnterpriseDevicePinners(enterpriseId, {
      queryParams: {
        direction:
          'desc' as GetEnterpriseDevicePinnersQueryParamsDirectionField,
      } satisfies GetEnterpriseDevicePinnersQueryParams,
    } satisfies GetEnterpriseDevicePinnersOptionalsInput);
  if (!(devicePinnersInDescDirection.entries!.length >= 0)) {
    throw new Error('Assertion failed');
  }
  const devicePinnerId: string = '123456';
  await expect(async () => {
    await client.devicePinners.getDevicePinnerById(devicePinnerId);
  }).rejects.toThrow();
  await expect(async () => {
    await client.devicePinners.deleteDevicePinnerById(devicePinnerId);
  }).rejects.toThrow();
});
export {};
