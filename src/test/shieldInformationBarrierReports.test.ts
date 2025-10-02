import { serializeShieldInformationBarrier } from '@/schemas/shieldInformationBarrier';
import { deserializeShieldInformationBarrier } from '@/schemas/shieldInformationBarrier';
import { serializeShieldInformationBarrierReports } from '@/schemas/shieldInformationBarrierReports';
import { deserializeShieldInformationBarrierReports } from '@/schemas/shieldInformationBarrierReports';
import { serializeShieldInformationBarrierReport } from '@/schemas/shieldInformationBarrierReport';
import { deserializeShieldInformationBarrierReport } from '@/schemas/shieldInformationBarrierReport';
import { serializeShieldInformationBarrierReference } from '@/schemas/shieldInformationBarrierReference';
import { deserializeShieldInformationBarrierReference } from '@/schemas/shieldInformationBarrierReference';
import { serializeShieldInformationBarrierBase } from '@/schemas/shieldInformationBarrierBase';
import { deserializeShieldInformationBarrierBase } from '@/schemas/shieldInformationBarrierBase';
import { serializeShieldInformationBarrierBaseTypeField } from '@/schemas/shieldInformationBarrierBase';
import { deserializeShieldInformationBarrierBaseTypeField } from '@/schemas/shieldInformationBarrierBase';
import { ShieldInformationBarrier } from '@/schemas/shieldInformationBarrier';
import { ShieldInformationBarrierReports } from '@/schemas/shieldInformationBarrierReports';
import { GetShieldInformationBarrierReportsQueryParams } from '@/managers/shieldInformationBarrierReports';
import { ShieldInformationBarrierReport } from '@/schemas/shieldInformationBarrierReport';
import { ShieldInformationBarrierReference } from '@/schemas/shieldInformationBarrierReference';
import { ShieldInformationBarrierBase } from '@/schemas/shieldInformationBarrierBase';
import { ShieldInformationBarrierBaseTypeField } from '@/schemas/shieldInformationBarrierBase';
import { getEnvVar } from '@/internal/utils';
import { getDefaultClientWithUserSubject } from './commons';
import { getOrCreateShieldInformationBarrier } from './commons';
import { BoxClient } from '@/client';
import { toString } from '@/internal/utils';
import { sdToJson } from '@/serialization/json';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
test('testShieldInformationBarrierReports', async function testShieldInformationBarrierReports(): Promise<any> {
  const client: BoxClient = getDefaultClientWithUserSubject(
    getEnvVar('USER_ID'),
  );
  const enterpriseId: string = getEnvVar('ENTERPRISE_ID');
  const barrier: ShieldInformationBarrier =
    await getOrCreateShieldInformationBarrier(client, enterpriseId);
  if (!((toString(barrier.status!) as string) == 'draft')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(barrier.type!) as string) == 'shield_information_barrier')) {
    throw new Error('Assertion failed');
  }
  if (!(barrier.enterprise!.id == enterpriseId)) {
    throw new Error('Assertion failed');
  }
  if (!((toString(barrier.enterprise!.type) as string) == 'enterprise')) {
    throw new Error('Assertion failed');
  }
  const barrierId: string = barrier.id!;
  const existingReports: ShieldInformationBarrierReports =
    await client.shieldInformationBarrierReports.getShieldInformationBarrierReports(
      {
        shieldInformationBarrierId: barrierId,
      } satisfies GetShieldInformationBarrierReportsQueryParams,
    );
  if (existingReports.entries!.length > 0) {
    return void 0;
  }
  const createdReport: ShieldInformationBarrierReport =
    await client.shieldInformationBarrierReports.createShieldInformationBarrierReport(
      {
        shieldInformationBarrier: {
          id: barrierId,
          type: 'shield_information_barrier' as ShieldInformationBarrierBaseTypeField,
        } satisfies ShieldInformationBarrierBase,
      } satisfies ShieldInformationBarrierReference,
    );
  if (
    !(
      createdReport.shieldInformationBarrier!.shieldInformationBarrier!.id ==
      barrierId
    )
  ) {
    throw new Error('Assertion failed');
  }
  const retrievedReport: ShieldInformationBarrierReport =
    await client.shieldInformationBarrierReports.getShieldInformationBarrierReportById(
      createdReport.id!,
    );
  if (!(retrievedReport.id == createdReport.id)) {
    throw new Error('Assertion failed');
  }
  const retrievedReports: ShieldInformationBarrierReports =
    await client.shieldInformationBarrierReports.getShieldInformationBarrierReports(
      {
        shieldInformationBarrierId: barrierId,
      } satisfies GetShieldInformationBarrierReportsQueryParams,
    );
  if (!(retrievedReports.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
});
export {};
