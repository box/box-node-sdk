import { serializeShieldInformationBarrier } from '../schemas/shieldInformationBarrier.generated.js';
import { deserializeShieldInformationBarrier } from '../schemas/shieldInformationBarrier.generated.js';
import { serializeShieldInformationBarrierReports } from '../schemas/shieldInformationBarrierReports.generated.js';
import { deserializeShieldInformationBarrierReports } from '../schemas/shieldInformationBarrierReports.generated.js';
import { serializeShieldInformationBarrierReport } from '../schemas/shieldInformationBarrierReport.generated.js';
import { deserializeShieldInformationBarrierReport } from '../schemas/shieldInformationBarrierReport.generated.js';
import { serializeShieldInformationBarrierReference } from '../schemas/shieldInformationBarrierReference.generated.js';
import { deserializeShieldInformationBarrierReference } from '../schemas/shieldInformationBarrierReference.generated.js';
import { serializeShieldInformationBarrierBase } from '../schemas/shieldInformationBarrierBase.generated.js';
import { deserializeShieldInformationBarrierBase } from '../schemas/shieldInformationBarrierBase.generated.js';
import { serializeShieldInformationBarrierBaseTypeField } from '../schemas/shieldInformationBarrierBase.generated.js';
import { deserializeShieldInformationBarrierBaseTypeField } from '../schemas/shieldInformationBarrierBase.generated.js';
import { ShieldInformationBarrier } from '../schemas/shieldInformationBarrier.generated.js';
import { ShieldInformationBarrierReports } from '../schemas/shieldInformationBarrierReports.generated.js';
import { GetShieldInformationBarrierReportsQueryParams } from '../managers/shieldInformationBarrierReports.generated.js';
import { ShieldInformationBarrierReport } from '../schemas/shieldInformationBarrierReport.generated.js';
import { ShieldInformationBarrierReference } from '../schemas/shieldInformationBarrierReference.generated.js';
import { ShieldInformationBarrierBase } from '../schemas/shieldInformationBarrierBase.generated.js';
import { ShieldInformationBarrierBaseTypeField } from '../schemas/shieldInformationBarrierBase.generated.js';
import { getEnvVar } from '../internal/utils.js';
import { getDefaultClientWithUserSubject } from './commons.generated.js';
import { getOrCreateShieldInformationBarrier } from './commons.generated.js';
import { BoxClient } from '../client.generated.js';
import { toString } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
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
