import { serializeDevicePinners } from '../schemas/devicePinners.js';
import { deserializeDevicePinners } from '../schemas/devicePinners.js';
import { serializeGetEnterpriseDevicePinnersQueryParamsDirectionField } from '../managers/devicePinners.js';
import { deserializeGetEnterpriseDevicePinnersQueryParamsDirectionField } from '../managers/devicePinners.js';
import { GetEnterpriseDevicePinnersOptionalsInput } from '../managers/devicePinners.js';
import { GetEnterpriseDevicePinnersOptionals } from '../managers/devicePinners.js';
import { BoxClient } from '../client.js';
import { DevicePinners } from '../schemas/devicePinners.js';
import { GetEnterpriseDevicePinnersQueryParams } from '../managers/devicePinners.js';
import { GetEnterpriseDevicePinnersQueryParamsDirectionField } from '../managers/devicePinners.js';
import { getDefaultClient } from './commons.js';
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
