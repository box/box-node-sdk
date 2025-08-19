import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type IntegrationMappingPartnerItemSlackTypeField = 'channel';
export class IntegrationMappingPartnerItemSlack {
  /**
   * Type of the mapped item referenced in `id`. */
  readonly type: IntegrationMappingPartnerItemSlackTypeField =
    'channel' as IntegrationMappingPartnerItemSlackTypeField;
  /**
   * ID of the mapped item (of type referenced in `type`). */
  readonly id!: string;
  /**
   * ID of the Slack workspace with which the item is associated. Use this parameter if Box for Slack is installed at a workspace level. Do not use `slack_org_id` at the same time. */
  readonly slackWorkspaceId?: string | null;
  /**
   * ID of the Slack org with which the item is associated. Use this parameter if Box for Slack is installed at the org level. Do not use `slack_workspace_id` at the same time. */
  readonly slackOrgId?: string | null;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<IntegrationMappingPartnerItemSlack, 'type'> &
      Partial<Pick<IntegrationMappingPartnerItemSlack, 'type'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.slackWorkspaceId !== undefined) {
      this.slackWorkspaceId = fields.slackWorkspaceId;
    }
    if (fields.slackOrgId !== undefined) {
      this.slackOrgId = fields.slackOrgId;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface IntegrationMappingPartnerItemSlackInput {
  /**
   * Type of the mapped item referenced in `id`. */
  readonly type?: IntegrationMappingPartnerItemSlackTypeField;
  /**
   * ID of the mapped item (of type referenced in `type`). */
  readonly id: string;
  /**
   * ID of the Slack workspace with which the item is associated. Use this parameter if Box for Slack is installed at a workspace level. Do not use `slack_org_id` at the same time. */
  readonly slackWorkspaceId?: string | null;
  /**
   * ID of the Slack org with which the item is associated. Use this parameter if Box for Slack is installed at the org level. Do not use `slack_workspace_id` at the same time. */
  readonly slackOrgId?: string | null;
  readonly rawData?: SerializedData;
}
export function serializeIntegrationMappingPartnerItemSlackTypeField(
  val: IntegrationMappingPartnerItemSlackTypeField,
): SerializedData {
  return val;
}
export function deserializeIntegrationMappingPartnerItemSlackTypeField(
  val: SerializedData,
): IntegrationMappingPartnerItemSlackTypeField {
  if (val == 'channel') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize IntegrationMappingPartnerItemSlackTypeField",
  });
}
export function serializeIntegrationMappingPartnerItemSlack(
  val: IntegrationMappingPartnerItemSlack,
): SerializedData {
  return {
    ['type']: serializeIntegrationMappingPartnerItemSlackTypeField(val.type),
    ['id']: val.id,
    ['slack_workspace_id']: val.slackWorkspaceId,
    ['slack_org_id']: val.slackOrgId,
  };
}
export function deserializeIntegrationMappingPartnerItemSlack(
  val: SerializedData,
): IntegrationMappingPartnerItemSlack {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "IntegrationMappingPartnerItemSlack"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "IntegrationMappingPartnerItemSlack" to be defined',
    });
  }
  const type: IntegrationMappingPartnerItemSlackTypeField =
    deserializeIntegrationMappingPartnerItemSlackTypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "IntegrationMappingPartnerItemSlack" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "IntegrationMappingPartnerItemSlack"',
    });
  }
  const id: string = val.id;
  if (
    !(val.slack_workspace_id == void 0) &&
    !sdIsString(val.slack_workspace_id)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "slack_workspace_id" of type "IntegrationMappingPartnerItemSlack"',
    });
  }
  const slackWorkspaceId: undefined | string =
    val.slack_workspace_id == void 0 ? void 0 : val.slack_workspace_id;
  if (!(val.slack_org_id == void 0) && !sdIsString(val.slack_org_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "slack_org_id" of type "IntegrationMappingPartnerItemSlack"',
    });
  }
  const slackOrgId: undefined | string =
    val.slack_org_id == void 0 ? void 0 : val.slack_org_id;
  return {
    type: type,
    id: id,
    slackWorkspaceId: slackWorkspaceId,
    slackOrgId: slackOrgId,
  } satisfies IntegrationMappingPartnerItemSlack;
}
export function serializeIntegrationMappingPartnerItemSlackInput(
  val: IntegrationMappingPartnerItemSlackInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeIntegrationMappingPartnerItemSlackTypeField(val.type),
    ['id']: val.id,
    ['slack_workspace_id']: val.slackWorkspaceId,
    ['slack_org_id']: val.slackOrgId,
  };
}
export function deserializeIntegrationMappingPartnerItemSlackInput(
  val: SerializedData,
): IntegrationMappingPartnerItemSlackInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "IntegrationMappingPartnerItemSlackInput"',
    });
  }
  const type: undefined | IntegrationMappingPartnerItemSlackTypeField =
    val.type == void 0
      ? void 0
      : deserializeIntegrationMappingPartnerItemSlackTypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "IntegrationMappingPartnerItemSlackInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "IntegrationMappingPartnerItemSlackInput"',
    });
  }
  const id: string = val.id;
  if (
    !(val.slack_workspace_id == void 0) &&
    !sdIsString(val.slack_workspace_id)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "slack_workspace_id" of type "IntegrationMappingPartnerItemSlackInput"',
    });
  }
  const slackWorkspaceId: undefined | string =
    val.slack_workspace_id == void 0 ? void 0 : val.slack_workspace_id;
  if (!(val.slack_org_id == void 0) && !sdIsString(val.slack_org_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "slack_org_id" of type "IntegrationMappingPartnerItemSlackInput"',
    });
  }
  const slackOrgId: undefined | string =
    val.slack_org_id == void 0 ? void 0 : val.slack_org_id;
  return {
    type: type,
    id: id,
    slackWorkspaceId: slackWorkspaceId,
    slackOrgId: slackOrgId,
  } satisfies IntegrationMappingPartnerItemSlackInput;
}
