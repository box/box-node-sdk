import { serializeDateTime } from '../../internal/utils';
import { deserializeDateTime } from '../../internal/utils';
import { BoxSdkError } from '../../box/errors';
import { DateTime } from '../../internal/utils';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface ShuttleAgentCredentialsV2026R0 {
  /**
   * The installation token to paste into the Windows agent installer to
   * register the agent. */
  readonly registrationToken: string;
  /**
   * When the registration token expires and can no longer be used. */
  readonly expiresAt: DateTime;
  readonly rawData?: SerializedData;
}
export function serializeShuttleAgentCredentialsV2026R0(
  val: ShuttleAgentCredentialsV2026R0,
): SerializedData {
  return {
    ['registration_token']: val.registrationToken,
    ['expires_at']: serializeDateTime(val.expiresAt),
  };
}
export function deserializeShuttleAgentCredentialsV2026R0(
  val: SerializedData,
): ShuttleAgentCredentialsV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleAgentCredentialsV2026R0"',
    });
  }
  if (val.registration_token == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "registration_token" of type "ShuttleAgentCredentialsV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.registration_token)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "registration_token" of type "ShuttleAgentCredentialsV2026R0"',
    });
  }
  const registrationToken: string = val.registration_token;
  if (val.expires_at == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "expires_at" of type "ShuttleAgentCredentialsV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.expires_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "expires_at" of type "ShuttleAgentCredentialsV2026R0"',
    });
  }
  const expiresAt: DateTime = deserializeDateTime(val.expires_at);
  return {
    registrationToken: registrationToken,
    expiresAt: expiresAt,
  } satisfies ShuttleAgentCredentialsV2026R0;
}
