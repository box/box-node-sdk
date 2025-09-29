import { serializeDevicePinners } from '@/schemas/devicePinners';
import { deserializeDevicePinners } from '@/schemas/devicePinners';
import { serializeGetEnterpriseDevicePinnersQueryParamsDirectionField } from '@/managers/devicePinners';
import { deserializeGetEnterpriseDevicePinnersQueryParamsDirectionField } from '@/managers/devicePinners';
import { GetEnterpriseDevicePinnersOptionalsInput } from '@/managers/devicePinners';
import { GetEnterpriseDevicePinnersOptionals } from '@/managers/devicePinners';
import { BoxClient } from '@/client';
import { DevicePinners } from '@/schemas/devicePinners';
import { GetEnterpriseDevicePinnersQueryParams } from '@/managers/devicePinners';
import { GetEnterpriseDevicePinnersQueryParamsDirectionField } from '@/managers/devicePinners';
import { getDefaultClient } from './commons';
import { getEnvVar } from '@/internal/utils';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
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
