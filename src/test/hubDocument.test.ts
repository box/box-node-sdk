import { serializeHubV2025R0 } from '@/schemas/v2025R0/hubV2025R0';
import { deserializeHubV2025R0 } from '@/schemas/v2025R0/hubV2025R0';
import { serializeHubCreateRequestV2025R0 } from '@/schemas/v2025R0/hubCreateRequestV2025R0';
import { deserializeHubCreateRequestV2025R0 } from '@/schemas/v2025R0/hubCreateRequestV2025R0';
import { serializeHubDocumentPagesV2025R0 } from '@/schemas/v2025R0/hubDocumentPagesV2025R0';
import { deserializeHubDocumentPagesV2025R0 } from '@/schemas/v2025R0/hubDocumentPagesV2025R0';
import { serializeHubDocumentPageV2025R0 } from '@/schemas/v2025R0/hubDocumentPageV2025R0';
import { deserializeHubDocumentPageV2025R0 } from '@/schemas/v2025R0/hubDocumentPageV2025R0';
import { serializeHubDocumentBlocksV2025R0 } from '@/schemas/v2025R0/hubDocumentBlocksV2025R0';
import { deserializeHubDocumentBlocksV2025R0 } from '@/schemas/v2025R0/hubDocumentBlocksV2025R0';
import { serializeHubParagraphTextBlockV2025R0 } from '@/schemas/v2025R0/hubParagraphTextBlockV2025R0';
import { deserializeHubParagraphTextBlockV2025R0 } from '@/schemas/v2025R0/hubParagraphTextBlockV2025R0';
import { serializeHubSectionTitleTextBlockV2025R0 } from '@/schemas/v2025R0/hubSectionTitleTextBlockV2025R0';
import { deserializeHubSectionTitleTextBlockV2025R0 } from '@/schemas/v2025R0/hubSectionTitleTextBlockV2025R0';
import { serializeHubCalloutBoxTextBlockV2025R0 } from '@/schemas/v2025R0/hubCalloutBoxTextBlockV2025R0';
import { deserializeHubCalloutBoxTextBlockV2025R0 } from '@/schemas/v2025R0/hubCalloutBoxTextBlockV2025R0';
import { serializeHubItemListBlockV2025R0 } from '@/schemas/v2025R0/hubItemListBlockV2025R0';
import { deserializeHubItemListBlockV2025R0 } from '@/schemas/v2025R0/hubItemListBlockV2025R0';
import { serializeHubDividerBlockV2025R0 } from '@/schemas/v2025R0/hubDividerBlockV2025R0';
import { deserializeHubDividerBlockV2025R0 } from '@/schemas/v2025R0/hubDividerBlockV2025R0';
import { serializeHubDocumentBlockEntryV2025R0 } from '@/schemas/v2025R0/hubDocumentBlockEntryV2025R0';
import { deserializeHubDocumentBlockEntryV2025R0 } from '@/schemas/v2025R0/hubDocumentBlockEntryV2025R0';
import { BoxClient } from '@/client';
import { HubV2025R0 } from '@/schemas/v2025R0/hubV2025R0';
import { HubCreateRequestV2025R0 } from '@/schemas/v2025R0/hubCreateRequestV2025R0';
import { HubDocumentPagesV2025R0 } from '@/schemas/v2025R0/hubDocumentPagesV2025R0';
import { GetHubDocumentPagesV2025R0QueryParams } from '@/managers/hubDocument';
import { HubDocumentPageV2025R0 } from '@/schemas/v2025R0/hubDocumentPageV2025R0';
import { HubDocumentBlocksV2025R0 } from '@/schemas/v2025R0/hubDocumentBlocksV2025R0';
import { GetHubDocumentBlocksV2025R0QueryParams } from '@/managers/hubDocument';
import { HubParagraphTextBlockV2025R0 } from '@/schemas/v2025R0/hubParagraphTextBlockV2025R0';
import { HubSectionTitleTextBlockV2025R0 } from '@/schemas/v2025R0/hubSectionTitleTextBlockV2025R0';
import { HubCalloutBoxTextBlockV2025R0 } from '@/schemas/v2025R0/hubCalloutBoxTextBlockV2025R0';
import { HubItemListBlockV2025R0 } from '@/schemas/v2025R0/hubItemListBlockV2025R0';
import { HubDividerBlockV2025R0 } from '@/schemas/v2025R0/hubDividerBlockV2025R0';
import { HubDocumentBlockEntryV2025R0 } from '@/schemas/v2025R0/hubDocumentBlockEntryV2025R0';
import { getDefaultClientWithUserSubject } from './commons';
import { getEnvVar } from '@/internal/utils';
import { getUuid } from '@/internal/utils';
import { toString } from '@/internal/utils';
import { sdToJson } from '@/serialization/json';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
export const client: BoxClient = getDefaultClientWithUserSubject(
  getEnvVar('USER_ID'),
);
test('testGetHubDocumentPagesAndBlocks', async function testGetHubDocumentPagesAndBlocks(): Promise<any> {
  const hubTitle: string = getUuid();
  const createdHub: HubV2025R0 = await client.hubs.createHubV2025R0({
    title: hubTitle,
  } satisfies HubCreateRequestV2025R0);
  const hubId: string = createdHub.id;
  const pages: HubDocumentPagesV2025R0 =
    await client.hubDocument.getHubDocumentPagesV2025R0({
      hubId: hubId,
    } satisfies GetHubDocumentPagesV2025R0QueryParams);
  if (!(pages.entries.length > 0)) {
    throw new Error('Assertion failed');
  }
  if (!((toString(pages.type) as string) == 'document_pages')) {
    throw new Error('Assertion failed');
  }
  const firstPage: HubDocumentPageV2025R0 = pages.entries[0];
  if (!((toString(firstPage.type) as string) == 'page')) {
    throw new Error('Assertion failed');
  }
  const pageId: string = firstPage.id;
  const blocks: HubDocumentBlocksV2025R0 =
    await client.hubDocument.getHubDocumentBlocksV2025R0({
      hubId: hubId,
      pageId: pageId,
    } satisfies GetHubDocumentBlocksV2025R0QueryParams);
  if (!((toString(blocks.type) as string) == 'document_blocks')) {
    throw new Error('Assertion failed');
  }
  if (!(blocks.entries.length > 0)) {
    throw new Error('Assertion failed');
  }
  const firstBlock: HubDocumentBlockEntryV2025R0 = blocks
    .entries![0] as HubDocumentBlockEntryV2025R0;
  if (!((toString(firstBlock.type!) as string) == 'item_list')) {
    throw new Error('Assertion failed');
  }
  await client.hubs.deleteHubByIdV2025R0(hubId);
});
export {};
